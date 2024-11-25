<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ProductsRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

/**
 * Class ProductsCrudController
 *
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class ProductsCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Configure the CrudPanel object. Apply settings to all operations.
     *
     * @return void
     */
    public function setup()
    {
        CRUD::setModel(\App\Models\Products::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/products');
        CRUD::setEntityNameStrings('products', 'products');
    }

    /**
     * Define what happens when the List operation is loaded.
     *
     * @see  https://backpackforlaravel.com/docs/crud-operation-list-entries
     * @return void
     */
    protected function setupListOperation()
    {
        CRUD::setFromDb(); // set columns from db columns.
        /**
         * Columns can be defined using the fluent syntax:
         * - CRUD::column('price')->type('number');
         */
    }

    /**
     * Define what happens when the Create operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-create
     * @return void
     */
    protected function setupCreateOperation()
    {
        CRUD::setValidation(ProductsRequest::class);

        CRUD::field('category_id')
            ->label('Category')
            ->type('select')
            ->entity('category')
            ->model('App\Models\ProductCategories')
            ->attribute('name')
            ->options(fn($query) => $query->orderBy('name', 'ASC')->get());

        CRUD::field('name')
            ->name('name')
            ->label('Name')
            ->type('text');

        CRUD::field('description')
            ->name('description')
            ->label('Description')
            ->type('summernote')
            ->options([
                'toolbar' => [
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['strikethrough']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']]
                ]
            ]);

        CRUD::field('image')
            ->label('Image')
            ->type('upload_multiple')
            ->upload()
            ->withFiles(true)
            ->disk('public');

        CRUD::field('price')
            ->name('price')
            ->label('Price')
            ->type('number')
            ->attributes(['step' => '0.01']);

        CRUD::field('stock')
            ->name('stock')
            ->label('Stock')
            ->type('number')
            ->attributes(['min' => 0]);

        CRUD::field('is_active')
            ->name('is_active')
            ->label('Is active')
            ->type('checkbox');

        // опціонально, щоб відсортувати результати
        CRUD::setFromDb(); // set fields from db columns.
        /**
         * Fields can be defined using the fluent syntax:
         * - CRUD::field('price')->type('number');
         */
    }

    /**
     * Define what happens when the Update operation is loaded.
     *
     * @see https://backpackforlaravel.com/docs/crud-operation-update
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
