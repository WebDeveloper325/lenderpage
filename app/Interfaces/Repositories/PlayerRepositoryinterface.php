<?php

declare(strict_types=1);

namespace App\Interfaces\Repositories;

/**
 * Interface PlayerRepositoryinterface
 *
 * @package App\Interfaces\Repositores
 */
interface PlayerRepositoryinterface
{
    /**
     * @param int $id
     * @return array
     */
    public function crudRules($id = 0): array;
}
