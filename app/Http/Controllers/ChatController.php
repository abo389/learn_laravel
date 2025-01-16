<?php

namespace App\Http\Controllers;

use App\Events\MessageEvent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    function index() {
        $users = User::where('id', '!=', auth('web')->user()->id)->get();
        return view('dashboard', compact('users'));
    }

    function fetchMessages($id) {
        $user = User::findOrFail($id);
        $messages = Message::where('from_id', auth('web')->id())
        ->where('to_id', $id)
        ->orwhere('from_id', $id)
        ->where('to_id', auth('web')->id())
        ->get();
        return response()->json([
            'user' => $user,
            'messages' => $messages
        ]);
    }

    function sendMessage(Request $request) {
        // dd($request->all());
        $request->validate([
            'contact_id' => ['required', 'exists:users,id'],
            'message' => ['required'],
        ]);

        $message = Message::create([
            'from_id' => auth('web')->id(),
            'to_id' => $request->contact_id,
            'message' => $request->message
        ]);

        event(new MessageEvent($request->message, $request->contact_id));

        return response($message);
    }
}
