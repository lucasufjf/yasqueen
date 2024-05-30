$(document).ready(function() {
    // Drag Queen data
    const dragQueensData = [
        {
            name: "RuPaul",
            realName: "RuPaul Andre Charles",
            age: 61,
            city: "San Diego",
            state: "California",
            country: "U.S.",
            famousFor: "Hosting 'RuPaul's Drag Race' and transforming drag into a mainstream phenomenon",
            image: "img/ru_paul.jpg",
            bio: "RuPaul Andre Charles, known mononymously as RuPaul, is an American drag queen, actor, model, singer, songwriter, and television personality. He is best known for hosting the reality competition television series 'RuPaul's Drag Race'. RuPaul's trailblazing career has spanned decades, and he is credited with bringing drag culture into the mainstream. Offstage, RuPaul is an advocate for LGBTQ+ rights and has used his platform to promote acceptance and inclusivity. He continues to inspire drag performers worldwide with his charisma, uniqueness, nerve, and talent.",
            quote: "You better work!",
            seasons: ["Season 1", "Season 2", "Season 3", "Season 4", "Season 5", "Season 6", "Season 7", "Season 8", "Season 9", "All Stars 1", "All Stars 2", "All Stars 3", "All Stars 4", "All Stars 5", "All Stars 6", "All Stars 7"],
            trivia: "RuPaul's debut single, 'Supermodel (You Better Work)', became a major hit in the early 1990s and helped propel him to international stardom. He has since released multiple albums and singles, earning several awards and accolades for his music. RuPaul is also a successful entrepreneur, with ventures in fashion, cosmetics, and publishing."
        },
        {
            name: "Bianca Del Rio",
            realName: "Roy Haylock",
            age: 46,
            city: "New Orleans",
            state: "Louisiana",
            country: "U.S.",
            famousFor: "Winning the sixth season of 'RuPaul's Drag Race'",
            image: "img/bianca_del_rio.jpg",
            bio: "Roy Haylock, better known by the stage name Bianca Del Rio, is an American drag queen, comedian, actor, and costume designer. She rose to fame after winning the sixth season of 'RuPaul's Drag Race'. Bianca's sharp wit and irreverent humor have made her a fan favorite in the drag community. Offstage, Roy is known for his philanthropic efforts, supporting various LGBTQ+ charities and organizations. Bianca continues to tour the world with her comedy shows, bringing laughter and joy to audiences everywhere.",
            quote: "Not today, Satan!",
            seasons: ["Season 6"],
            trivia: "Bianca Del Rio's name is a combination of the name of a close friend and a favorite movie character. She is known for her signature catchphrase, 'Not today, Satan!', which has become a popular meme and catchphrase among drag fans."
        },
        {
            name: "Adore Delano",
            realName: "Daniel Anthony Noriega",
            age: 31,
            city: "Azusa",
            state: "California",
            country: "U.S.",
            famousFor: "Competing on the sixth season of 'RuPaul's Drag Race'",
            image: "img/adore_delano.jpg",
            bio: "Daniel Anthony Noriega, better known by the stage name Adore Delano, is an American drag queen, singer, and television personality. She gained popularity as a contestant on the sixth season of 'RuPaul's Drag Race' and subsequently appeared on 'RuPaul's Drag Race: All Stars'. Adore is known for her punk rock aesthetic and powerful vocal performances. Offstage, Daniel has released several successful albums and singles, establishing a successful music career. Adore's unique style and personality have earned her a dedicated fan base worldwide.",
            quote: "Party!",
            seasons: ["Season 6", "All Stars 2"],
            trivia: "Adore Delano's name was inspired by the character 'Adore' from the movie 'To Wong Foo, Thanks for Everything! Julie Newmar'. She is known for her signature catchphrase, 'Party!', which has become a popular meme and catchphrase among drag fans."
        },
    ];

    // Convert data to DragQueen instances
    const allDragQueens = dragQueensData.map(dragQueenData => new DragQueen(
        dragQueenData.name,
        dragQueenData.realName,
        dragQueenData.age,
        dragQueenData.city,
        dragQueenData.state,
        dragQueenData.country,
        dragQueenData.famousFor,
        dragQueenData.image,
        dragQueenData.bio,
        dragQueenData.quote,
        dragQueenData.seasons,
        dragQueenData.trivia
    ));

    // Function to filter drag queens based on search criteria
    function filterDragQueens() {
        const searchByName = $('#searchByName').val().toLowerCase();
        const searchBySeason = $('#searchBySeason').val();
        const searchByState = $('#searchByState').val();
        const searchByNameDropdown = $('#searchByNameDropdown').val();

        const filteredDragQueens = allDragQueens.filter(dragQueen => {
            const matchesName = dragQueen.name.toLowerCase().includes(searchByName);
            const matchesSeason = searchBySeason === '' || dragQueen.seasons.includes(searchBySeason);
            const matchesState = searchByState === '' || dragQueen.state === searchByState;
            const matchesDropdown = searchByNameDropdown === '' || dragQueen.name === searchByNameDropdown;
            return matchesName && matchesSeason && matchesState && matchesDropdown;
        });

        $('#dragQueensContainer').empty();
        filteredDragQueens.forEach(dragQueen => {
            const dragQueenElement = dragQueen.createDragQueenElement(filterDragQueens);
            $('#dragQueensContainer').append(dragQueenElement);
        });

        $('#totalDragQueenCount').text(`Total Drag Queens: ${filteredDragQueens.length}`);
    }

    // Populate dropdowns with unique values
    function populateDropdowns() {
        const searchByNameDropdown = $('#searchByNameDropdown');
        const searchBySeason = $('#searchBySeason');
        const searchByState = $('#searchByState');

        const uniqueSeasons = new Set();
        const uniqueStates = new Set();

        allDragQueens.forEach(dragQueen => {
            uniqueSeasons.add(...dragQueen.seasons);
            uniqueStates.add(dragQueen.state);

            const option = $('<option>', { value: dragQueen.name, text: dragQueen.name });
            searchByNameDropdown.append(option);
        });

        uniqueSeasons.forEach(season => {
            const option = $('<option>', { value: season, text: season });
            searchBySeason.append(option);
        });

        uniqueStates.forEach(state => {
            const option = $('<option>', { value: state, text: state });
            searchByState.append(option);
        });
    }

    // Initialize page
    populateDropdowns();
    filterDragQueens();

    // Event listeners for filters
    $('#searchByName').on('input', filterDragQueens);
    $('#searchBySeason').on('change', filterDragQueens);
    $('#searchByState').on('change', filterDragQueens);
    $('#searchByNameDropdown').on('change', filterDragQueens);

    // Event listener for content replacement button
    $('#contentReplacementBtn').on('click', function() {
        // Example content replacement
        $('#dragQueensContainer').html('<p>Yas, Queen - Your source for all things drag!</p>');
    });

    // Event listener for style alteration button
    $('#styleAlterationBtn').on('click', function() {
        // Toggle grayscale mode
        $('html').toggleClass('grayscale-mode');
    });

    // Event listener for hover over header
    $('header').hover(function() {
        //alert('Yas, Queen! Your source for all things Drag!');
    });

    // Event listener for adding item
    $('#addBtn').on('click', function() {
        const newItem = prompt('Enter the name of the queen to add:');
        if (newItem) {
            const listItem = $('<li>').text(newItem);
            $('#myList').append(listItem);
        }
    });

    // Event listener for removing item
    $('#removeBtn').on('click', function() {
        const itemToRemove = prompt('Enter the name of the queen to remove:');
        if (itemToRemove) {
            $('#myList li').filter(function() {
                return $(this).text() === itemToRemove;
            }).remove();
        }
    });
});