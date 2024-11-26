<?php

namespace App\Http\Controllers;

use App\Models\Info;
use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function index(Request $request, $slug)
    {
        $info = Info::where('slug', $slug)->firstOrFail();
        return response()->json([
            'title' => $info->title,
            'content' => $info->content,
        ]);
    }
}

