<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    protected string $defaultLocale;

    protected array $allowedLocales;

    public function __construct()
    {
        $this->defaultLocale = config('app.fallback_locale');
        $this->allowedLocales = config('app.locale_list');
    }

    public function handle(Request $request, Closure $next)
    {
        $locale = $this->determineLocale($request);

        App::setLocale($locale);
        if (Session::get('locale') !== $locale) {
            Session::put('locale', $locale);
        }

        return $next($request);
    }

    protected function determineLocale(Request $request): string
    {
        return $this->getLocaleFromRoute($request)
            ?? $this->getLocaleFromSession()
            ?? $this->getLocaleFromUrlSegment($request)
            ?? $this->defaultLocale;
    }

    protected function getLocaleFromRoute(Request $request): ?string
    {
        return $this->validateLocale($request->route('locale'));
    }

    protected function getLocaleFromUrlSegment(Request $request): ?string
    {
        return $this->validateLocale($request->segment(1));
    }

    protected function getLocaleFromSession(): ?string
    {
        return $this->validateLocale(Session::get('locale'));
    }

    protected function validateLocale(?string $locale): ?string
    {
        return in_array($locale, $this->allowedLocales) ? $locale : null;
    }
}
