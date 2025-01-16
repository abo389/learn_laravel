<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Msg extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public $text)
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('chat-components.msg');
    }
}
