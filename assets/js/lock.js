const sha512 = ( str ) => crypto.subtle.digest( "SHA-512", new TextEncoder( "utf-8" ).encode( str ) ).then( buf =>
    Array.prototype.map.call( new Uint8Array( buf ), x => ( ( '00' + x.toString( 16 ) ).slice( -2 ) ) ).join( '' ) );
let token = new URL( window.location ).searchParams.get( 'fr-token' );
const checker = async () => {
    console.time( 'Hash' )
    const plainTok = await sha512( token );
    const b64Tok = token?.length % 4 === 0 ? await sha512( atob( token ) ) : 0;
    const answers = await Promise.all( [ plainTok, b64Tok ] );
    if ( plainTok === hash ) {
        let url = new URL( window.location );
        url.searchParams.set( 'fr-token', btoa( token ) );
        token = btoa( token );
        window.history.pushState( {}, '', url );
    }
    if ( answers.includes( hash ) ) return 238
    return 400;
}
checker().then( r => {
    if ( r === 238 ) {
        setTimeout( () => {
            document.querySelectorAll( 'a' ).forEach( a => {
                let url = new URL( a.href );
                url.searchParams.set( 'fr-token', token );
                a.href = url;
            } )
            let url = new URL( document.querySelector( 'form' ).action );
            url.searchParams.set( 'fr-token', token );
            document.querySelector( 'form' ).action = url;
        }, 0.5e3 )
    }
    else {
        document.body.innerHTML = `
            <span class="na">Not Authorized for Access!</span><br/>
            <input size=10 id="token" type="password" class="na2" placeholder="Password" autofocus/>
            <button id="go">&rarr;</button>
            <style>
                body{width:100%;text-align:center;height: 60vh;padding-top:25vh;}
                .na{color: #f44;font: lighter 64px Helvetica;}
                input,button{background: transparent;color: #000;font: lighter 64px Helvetica;outline: none;border: 0;padding:0;margin:0;}
            </style>`;
        let scrip = document.createElement( 'script' );
        document.head.innerHTML = '';
        const checker = `setTimeout(()=>
                    document.querySelector( '#go' ).addEventListener( 'click', ( e ) => {
                    let url = new URL( window.location );
                    url.searchParams.set( 'fr-token', document.querySelector( '#token' ).value );
                    window.location.href = url;
                    return 0;
                    }),0.5e3)`
        scrip.textContent = checker;
        document.head.appendChild( scrip );
        document.title = 'Auth Error';
    }
} );