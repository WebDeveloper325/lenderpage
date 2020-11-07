<?php

namespace App\Providers;

use App\Interfaces\Repositories\TeamRepositoryInterface;
use App\Interfaces\Repositories\PlayerRepositoryinterface;
use App\Repositories\TeamRepository;
use App\Repositories\PlayerRepository;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

/**
 * Class RepositoryProvider
 * @package App\Providers
 */
class RepositoryProvider extends ServiceProvider implements DeferrableProvider
{
    /**
     * Get the repositories provided by the provider
     *
     * @return array
     */
    public function provides(): array
    {
        return [
            TeamRepositoryInterface::class,
            PlayerRepositoryinterface::class,
        ];
    }

    /**
     * Register and bind Interfaces and Repositories
     *
     * @return void
     */
    public function register(): void
    {
        $this->app->bind(
            TeamRepositoryInterface::class,
            TeamRepository::class
        );
        $this->app->bind(
            PlayerRepositoryinterface::class,
            PlayerRepository::class
        );
    }
}
