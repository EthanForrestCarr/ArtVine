const randomQuotes = [
    {
        "author": 'Mark Twain',
        "quote": '“Writing is easy. All you have to do is cross out the wrong words.”'
    }, {
        "author": 'Mark Twain',
        "quote": '“It takes a heap of sense to write good nonsense.”'
    }, {
        "author": 'Mark Twain',
        "quote": '“It\’s no wonder that truth is stranger than fiction. Fiction has to make sense.”'
    }, {
        "author": 'Mark Twain',
        "quote": '“A successful book is not made of what is in it, but what is left out of it.”'
    }, {
        "author": 'Benjamin Franklin',
        "quote": '"Either write something worth reading, or do something worth writing about."'
    }, {
        "author": 'Stephen King',
        "quote": '“The road to hell is paved with adverbs.”'
    }, {
        "author": 'Stephen King',
        "quote": '“You can, you should, and if you\’re brave enough to start, you will.”'
    }, {
        "author": 'Stephen King',
        "quote": '“Amateurs sit and wait for inspiration, the rest of us just get up and go to work.”'
    }, {
        "author": 'Stephen King',
        "quote": '“Just remember that Dumbo didn\'t need the feather; the magic was in him.”'
    }, {
        "author": 'Shel Silverstein',
        "quote": 'When I am gone what will you do? Who will write and draw for you? Someone smarter--someone new? Someone better--maybe YOU!'
    }, {
        "author": 'Dr. Seuss',
        "quote": '"The more that you read, the more things you will know. The more that you learn, the more places you\'ll go."'
    }, {
        "author": 'Dr. Seuss',
        "quote": '“Don\'t cry because it\'s over. Smile because it happened.”'
    }, {
        "author": 'Dr. Seuss',
        "quote": '“You\'re off to Great Places! Today is your day! Your mountain is waiting, So... get on your way!”'
    }, {
        "author": 'Roald Dahl',
        "quote": '"There is no place I know that compares to pure imagination."'
    }, {
        "author": 'John Steinbeck',
        "quote": 'The writer must believe that what he is doing is the most important thing in the world. And he must hold to this illusion even when he knows it is not true."'
    }, {
        "author": 'Ayn Rand',
        "quote": '"Words are a lens to focus one\'s mind."'
    }
]

export const getRandomQuote = () => {
    return randomQuotes[Math.floor(Math.random() * randomQuotes.length)]
};

