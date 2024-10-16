<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile of {{ $user->name }}</title>
</head>
<body>
    <h1>Profile of {{ $user->name }}</h1>
    <p>Email: {{ $user->email }}</p>
    <p>Created At: {{ $user->created_at }}</p>
    <p>Updated At: {{ $user->updated_at }}</p>
    <!-- Додайте інші поля, які хочете відобразити -->
</body>
</html>
