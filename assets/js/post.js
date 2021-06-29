function copyToClipboard () {
    const el = document.createElement( 'textarea' );
    el.value = window.location.href;
    el.setAttribute( 'readonly', '' );
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild( el );
    const selected =
        document.getSelection().rangeCount > 0
            ? document.getSelection().getRangeAt( 0 )
            : false;
    el.select();
    document.execCommand( 'copy' );
    document.body.removeChild( el );
    if ( selected ) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange( selected );
    }
};

const nav = document.querySelector( 'nav' );

const bod = document.body;
const height = window.innerHeight
window.addEventListener( "scroll", () => {
    let scrollPercentRounded = Math.round( window.scrollY * 100 / ( bod.offsetHeight - height ) );
    bod.style.setProperty( '--read', scrollPercentRounded + '%' );
} );

const syllables = ( word ) => word.length <= 3 ? 1 : word?.toLowerCase()?.replace( /(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '' )?.replace( /^y/, '' )?.match( /[aeiouy]{1,2}/g )?.length;

const spaces = sents.split( ' ' ).length;

const polysyllables = sents.split( ' ' ).map( syllables ).filter( e => e > 2 );
const sentCount = sents.split( /[.!?:;"]/g ).filter( e => e.trim() ).length;

const AutoReadIndx = ( ( 4.71 * ( ( charCount - spaces ) / wordCount ) ) + ( 0.5 * ( wordCount / sentCount ) ) - 22 ) / 14;
const Coleman_Liau = ( ( 5.88 * ( ( charCount - spaces ) / wordCount ) ) - ( 29.6 * ( sentCount / wordCount ) ) - 16 ) / 16;
const SMOG_index = ( ( 1 * Math.pow( 30 * polysyllables.reduce( ( a, b ) => a + b, 0 ) / sentCount, 0.5 ) ) + 3 ) / 20;

const average = 0.5 * SMOG_index + 0.25 * AutoReadIndx + 0.25 * Coleman_Liau;

const scale = ~~( 100 * 3.3 * ( average - 0.7 ) );

const difficulty = ( val ) => {
    console.log( val );
    if ( val <= 68 ) return 'Easy';
    if ( val <= 82 ) return 'Light';
    if ( val >= 96 ) return 'Heavy';
}

document.querySelector( '#difficulty' ).innerText = difficulty( scale );