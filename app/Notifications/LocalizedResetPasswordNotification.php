<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;

class LocalizedResetPasswordNotification extends Notification
{
    protected $token;

    protected $appLocale;

    /**
     * Create a notification instance.
     *
     * @param string $token
     * @param string $locale
     */
    public function __construct($token, $appLocale)
    {
        $this->token = $token;
        $this->appLocale = $appLocale;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     *
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param mixed $notifiable
     *
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $url = url("{$this->appLocale}/reset-password/{$this->token}?email=" . urlencode($notifiable->email));

        return (new MailMessage)
            ->subject(Lang::get('Reset Password Notification'))
            ->line(
                Lang::get('You are receiving this email because we received a password reset request for your account.'),
            )
            ->action(Lang::get('Reset Password'), $url)
            ->line(Lang::get('If you did not request a password reset, no further action is required.'));
    }
}
