<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use App\Models\BlogPosts;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPosts::where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->get(['id', 'title', 'slug', 'content', 'image', 'created_at']);

        $posts = $posts->map(function ($post) {
            $post->image = collect(json_decode($post->image, true) ?? [])
                ->map(fn($image) => asset('storage/' . $image));
            return $post;
        });

        return response()->json(['posts' => $posts]);
    }

    public function singlePost($slug)
    {
        $post = BlogPosts::where('slug', $slug)->firstOrFail();

        $post->image = collect(json_decode($post->image, true) ?? [])
            ->map(fn($image) => asset('storage/' . $image));

        return response()->json([
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'content' => $post->content,
            'image' => $post->image,
            'created_at' => $post->created_at,
        ]);
    }

}
