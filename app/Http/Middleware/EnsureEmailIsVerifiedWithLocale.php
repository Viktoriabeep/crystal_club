<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

class EnsureEmailIsVerifiedWithLocale
{
    public function handle($request, Closure $next, $redirectToRoute = null)
    {
        if (
            !$request->user() ||
            ($request->user() instanceof MustVerifyEmail &&
                !$request->user()->hasVerifiedEmail())
        ) {
            $locale = Session::get('locale', config('app.fallback_locale'));

            return Redirect::guest(
                URL::route(
                    'verification.notice.locale',
                    ['locale' => $locale],
                ),
            );
        }

        return $next($request);
    }
}
