$( document ).ready( function ()
{
    const baseUrl = $( 'meta[name="base_url"]' ).attr( 'content' );
    const selectedContact = $( 'meta[name="selected_contact"]' );
    const authId = $( 'meta[name="auth_id"]' ).attr( 'content' );
    const inbox = $( '.messages ul' );

    const blank = document.querySelector( '.blank-wrap' );
    function hideBlank () { blank.classList.add( 'd-none' ); }

    const loader = document.querySelector( '.loader-container' );
    function toggelLoader () { loader.classList.toggle( 'd-none' ); }

    function fetchMessages ()
    {
        let contactId = selectedContact.attr( 'content' );
        $.ajax( {
            method: 'GET',
            url: baseUrl + '/fetch-messages/' + contactId,
            beforeSend: toggelLoader,
            complete: toggelLoader,
            success: function ( response )
            {
                setContactInfo( response );
                scrollToBottom();
            },
            error: function ( error )
            {
                console.log( error );
            }
        } );
    }

    function setContactInfo ( data )
    {
        let contactId = selectedContact.attr( 'content' );
        $( '.contact-name' ).text( data.user.name );
        inbox.empty();
        data.messages.forEach( message =>
        {
            let type = message.from_id == contactId ? 'replies': 'sent';
            inbox.append( messageTemplate( message.message, type ) );
        } );
    }

    function messageTemplate ( message, type )
    {
        return `
            <li class="${ type }">
                <img src="${ baseUrl }/default-image.jpg" alt="" />
                <p>${ message }</p>
            </li>
        `;
    }

    function sendMessage ()
    {
        let contactId = selectedContact.attr( 'content' );
        let formData = $( ".message-form" ).serialize();
        $.ajax( {
            method: 'POST',
            url: baseUrl + '/send-message',
            data: formData + '&contact_id=' + contactId,
            beforeSend: function ()
            {
                let msg = $( '.form-input' ).val();
                inbox.append( messageTemplate( msg, 'sent' ) );
                $( '.form-input' ).val( '' );
                $( '.form-input' ).focus();
                scrollToBottom();
            },
            success: function ( response )
            {
                // console.log( response );
            },
            error: function ( error )
            {
                console.log( error );
            }
        } );
    }

    function scrollToBottom ()
    {
        $( '.messages' ).animate( {
            scrollTop: $( '.messages' ).prop( 'scrollHeight' )
        }, 1000 );
    }

    $( '.contact' ).click( function ()
    {
        const contactId = $( this ).data( 'id' );
        selectedContact.attr( 'content', contactId );
        hideBlank();
        fetchMessages();
        $( '.form-input' ).focus();
    } );

    $( ".message-form" ).submit( function ( e )
    {
        e.preventDefault();
        sendMessage();
    } );

    window.Echo.private( 'chat.' + authId )
        .listen( 'MessageEvent', ( e ) =>
        {
            if ( e.from_id == selectedContact.attr( 'content' ) )
            {
                inbox.append( messageTemplate( e.text, 'replies' ) );
                scrollToBottom();
            }
        } );
    
    window.Echo.join( 'online' )
        .here( ( users ) =>
        {
            users.forEach( user =>
            {
                let element = $( `.contact[data-id="${ user.id }"]` );
                if(element.length > 0)
                {
                    element.find( '.contact-status' ).removeClass( 'offline' ).addClass( 'online' );
                } else
                {
                    element.find( '.contact-status' ).removeClass( 'online' ).addClass( 'offline' );
                }
            } );
        } )
        .joining( ( user ) =>
        {
            let element = $( `.contact[data-id="${ user.id }"]` );
            element.find( '.contact-status' ).removeClass( 'offline' ).addClass( 'online' );
        } )
        .leaving( ( user ) =>
        {
            let element = $( `.contact[data-id="${ user.id }"]` );
            element.find( '.contact-status' ).removeClass( 'online' ).addClass( 'offline' );
        } );
} );