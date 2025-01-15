import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
window.Pusher = Pusher;

window.Echo = new Echo( {
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true
} );

let id = document.querySelector( 'meta[name="user_id"]' ).content;
console.log( id );
window.Echo.private( 'chat.'+id ).listen( 'PublicMsg', ( e ) =>
{
    console.log( e );
    document.getElementById( 'test' ).innerHTML += `<p>${e.message}</p>`;
    console.log( 'MessageSent' );
} );

window.Echo.join( 'online' )
    .here( ( e ) => console.log( e ) )
    .joining( ( e ) => console.log( 'joining',e ) )
    .leaving( ( e ) => console.log( 'leaving',e ) )