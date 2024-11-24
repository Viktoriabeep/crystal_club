<?php

namespace App\Traits;

use ReflectionEnum;

trait EnumHelper
{
    public static function names(): array
    {
        return array_map(fn($case) => $case->name, static::cases());
    }

    public static function values(): array
    {
        return array_map(fn($case) => $case->value, static::cases());
    }

    public static function nameToValue(string $name): string|int
    {
        foreach (static::cases() as $case) {
            if ($case->name === $name) {
                return $case->value;
            }
        }

        $enum_type = (new ReflectionEnum(static::class))->getBackingType()?->getName();

        return match ($enum_type) {
            'int' => 0,
            default => '',
        };
    }

    public static function valueToName(mixed $value): string
    {
        foreach (static::cases() as $case) {
            if ($case->value === $value) {
                return $case->name;
            }
        }

        return '';
    }

    public static function toArray(): array
    {
        return array_reduce(
            static::cases(),
            fn($carry, $case) => array_merge($carry, [$case->name => $case->value]),
            [],
        );
    }
}
