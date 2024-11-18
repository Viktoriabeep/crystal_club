<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/app.jsx', 'resources/css/login.css'])
</head>
<body>
    @inertia
</body>
</html>