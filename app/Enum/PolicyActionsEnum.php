<?php

namespace App\Enum;

use App\Traits\EnumHelper;

enum PolicyActionsEnum: string
{
    use EnumHelper;
    case CREATE = 'Create';
    case DELETE = 'Delete';
    case FORCE_DELETE = 'Force delete';
    case RESTORE = 'Restore';
    case UPDATE = 'Update';
    case VIEW = 'View';
    case VIEW_ANY = 'View any';
}
