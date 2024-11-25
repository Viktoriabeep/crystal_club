{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i
                class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

<x-backpack::menu-dropdown title="Access Control" icon="la la-lock">
    <x-backpack::menu-dropdown-item title="Users" icon="la la-user" :link="backpack_url('user')"/>
    <x-backpack::menu-dropdown-item title="Roles" icon="la la-user-tag" :link="backpack_url('role')"/>
    <x-backpack::menu-dropdown-item title="Permissions" icon="la la-key" :link="backpack_url('permission')"/>
</x-backpack::menu-dropdown>

<x-backpack::menu-dropdown title="Products" icon="la la-cube">
    <x-backpack::menu-dropdown-item title="Products" icon="la la-cube" :link="backpack_url('products')"/>
    <x-backpack::menu-dropdown-item title="Categories" icon="la la-tags" :link="backpack_url('product-categories')"/>
</x-backpack::menu-dropdown>

<x-backpack::menu-dropdown title="Sales" icon="la la-shopping-cart">
    <x-backpack::menu-dropdown-item title="Orders" icon="la la-receipt" :link="backpack_url('orders')"/>
    <x-backpack::menu-dropdown-item title="Order Items" icon="la la-list" :link="backpack_url('order-items')"/>
    <x-backpack::menu-dropdown-item title="Customers" icon="la la-users" :link="backpack_url('customers')"/>
</x-backpack::menu-dropdown>

<x-backpack::menu-dropdown title="Blog" icon="la la-newspaper">
    <x-backpack::menu-dropdown-item title="Posts" icon="la la-edit" :link="backpack_url('blog-posts')"/>
</x-backpack::menu-dropdown>

<x-backpack::menu-dropdown-item title="Info" icon="la la-info" :link="backpack_url('info')"/>
