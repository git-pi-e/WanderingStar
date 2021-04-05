( function () {
    function displaySearchResults ( results, store ) {
        let searchResults = document.getElementById( 'search-results' );

        if ( results.length ) {
            let appendString = '';
            for ( let i = 0;i < results.length;i++ ) {
                let item = store[ results[ i ].ref ];
                appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
                appendString += '<p>' + item.content.substring( 0, 150 ) + '...</p></li>';
            }
            searchResults.innerHTML = appendString;
        } else searchResults.innerHTML = '<li>No results found</li>';
    }

    function getQueryletiable ( letiable ) {
        let query = window.location.search.substring( 1 );
        let lets = query.split( '&' );

        for ( let i = 0;i < lets.length;i++ ) {
            let pair = lets[ i ].split( '=' );

            if ( pair[ 0 ] === letiable ) return decodeURIComponent( pair[ 1 ].replace( /\+/g, '%20' ) );
        }
    }

    let searchTerm = getQueryletiable( 'query' );

    if ( searchTerm ) {
        document.getElementById( 'search-title' ).innerText = searchTerm;
        document.getElementById( 'search_box' ).setAttribute( "value", searchTerm );

        let idx = lunr( function () {
            this.field( 'title', { boost: 10 } );
            this.field( 'content' );
        } );

        for ( let key in window.store ) {
            idx.add( {
                'id': key,
                'title': window.store[ key ].title,
                'content': window.store[ key ].content
            } );
            let results = idx.search( searchTerm );
            displaySearchResults( results, window.store );
        }
    }
} )();