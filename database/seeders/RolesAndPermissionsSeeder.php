<?php

namespace Database\Seeders;

use App\Enum\PolicyActionsEnum;
use App\Models\UserModel;
use Illuminate\Database\Seeder;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use ReflectionClass;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        DB::transaction(function () {
            $collection = $this->getPolicyGroups(app_path('Policies'));
            $collection->push('horizon');
            $collection->push('response needed page');
            $collection->push('proxy files');

            $collection->sort()->values()->each(function ($item) {
                $this->createPermissionWithChecks($item, PolicyActionsEnum::VIEW_ANY->value);
                $this->createPermissionWithChecks($item, PolicyActionsEnum::VIEW->value);

                if (!str_contains($item, 'archives') && !str_contains($item, 'horizon')) {
                    $this->createPermissionWithChecks($item, PolicyActionsEnum::CREATE->value);
                    $this->createPermissionWithChecks($item, PolicyActionsEnum::UPDATE->value);
                    $this->createPermissionWithChecks($item, PolicyActionsEnum::RESTORE->value);
                    $this->createPermissionWithChecks($item, PolicyActionsEnum::DELETE->value);
                    $this->createPermissionWithChecks($item, PolicyActionsEnum::FORCE_DELETE->value);
                }
            });

            $this->createOrUpdateUserWithPermissions(
                config('app.system_role'),
                config('app.system_email'),
                Hash::make(config('app.system_password')),
            );

            $this->createOrUpdateUserWithPermissions(
                config('app.service_role'),
                config('app.service_email'),
                Hash::make(config('app.service_password')),
            );

            $this->createOrUpdateUserWithPermissions(
                config('app.super_admin_role'),
                config('app.super_admin_email'),
                Hash::make(config('app.super_admin_password')),
            );
        });
    }

    private function createPermissionWithChecks(string $item, string $action): void
    {
        $permission_name = $action . ' ' . $item;
        if (!Permission::where('name', $permission_name)->exists()) {
            Permission::create(['group' => ucfirst($item), 'name' => $permission_name]);
        }
    }

    private function createOrUpdateUserWithPermissions(string $role_name, string $email, string $password): void
    {
        $role = Role::firstOrCreate(['name' => $role_name]);

        $user = UserModel::whereEmail($email)->first();

        if ($user === null) {
            $user = UserModel::create([
                'name' => $role_name,
                'email' => $email,
                'password' => $password,
            ]);
        } else {
            $user->update(['password' => $password]);
        }

        if (!$user->hasRole($role_name)) {
            $user->assignRole($role_name);
        }

        $role->syncPermissions(Permission::all());
    }

    public function getPolicyGroups(string $directory): Collection
    {
        $files = new Filesystem;

        $policy_files = $files->allFiles($directory);

        return collect($policy_files)->map(function ($file) {
            require_once $file->getPathname();

            $class_name = $this->getClassNameFromFile($file->getPathname());

            if (class_exists($class_name)) {
                $reflector = new ReflectionClass($class_name);
                if ($reflector->hasProperty('group')) {
                    $property = $reflector->getProperty('group');
                    $property->setAccessible(true);

                    return $property->getValue(new $class_name);
                }
            }

            return null;
        })->filter()->values();
    }

    protected function getClassNameFromFile(string $file_path): ?string
    {
        $content = file_get_contents($file_path);
        if (preg_match('/namespace\s+(.+?);/s', $content, $matches)) {
            $namespace = $matches[1];
            $class = basename($file_path, '.php');

            return $namespace . '\\' . $class;
        }

        return null;
    }
}
