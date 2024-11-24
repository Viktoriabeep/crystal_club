<?php

namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;
use Inertia\Inertia;

class GuestLayout extends Component
{
    /**
     * Get the view / contents that represents the component.
     */
    public function render()
    {
        return Inertia::render('auth/VerifyEmail');
    }
}
