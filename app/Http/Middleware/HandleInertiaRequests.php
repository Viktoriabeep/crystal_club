<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'layouts.app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? $request->user()->only('id', 'name', 'email') : null,
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'csrf_token' => csrf_token(),
            'currentUrl' => $request->fullUrl(),
            // locale
            'locale' => app()->getLocale(),
            'supportedLocales' => config('app.locale_list'),
            'translations' => fn()
                => json_decode(
                file_get_contents(base_path('lang/' . app()->getLocale() . '.json')),
                true,
            ),
        ]);
    }
}
