// !!!!!!!!!!!!!!!!!!!!!
// DO NOT AUTO FORMAT THIS CODE
// TEMPLATE LITERALS IN USE
// !!!!!!!!!!!!!!!!!!!!!

/* import mongoose from "mongoose"; */

export const seedCompositions = async () => {

    const jsonData = [
        {
            "_id": `000000000000000000000001`,
            "compositionTitle": `Snowy`,
            "compositionAuthor": `Brad Shurts`,
            "compositionText":
`A hill
and a landfill,
    after it snows,
both softly glow
    under the moon.

But it won't last forever - 
    "Never, never, never!"`,
            "tags": [`short`,`winter`, 'snow', 'has many tags', 'has a pretty long tag', 'one more tag']
        },
        {
            "_id": `000000000000000000000002`,
            "compositionTitle": `Little Light`,
            "compositionAuthor": `Brad Shurts`,
            "compositionText": `I see a shimmer,
A little bright light
Behind her eyes
I capture with mine.
It twirls and dances
And soon takes flight.
Twisting and weaving
It beckons I follow,
I never lose sight.

I feel the warm sun,
A little snug embrace
Behind her smile
I capture with mine.
It skips and sways
And soon kneels down.
Soothing and calming
It beckons I slow,
I catch my breath.

I know a quiet place,
A little peaceful nest
Behind her heart
I capture with mine.
It ebbs and flows
And soon makes rest.
Sitting and breathing
It beckons I stop.`,
            "tags": [`love`,`relationship`]
        },
        {
            "_id": `000000000000000000000003`,
            "compositionTitle": `I Am King, My Queen`,
            "compositionAuthor": `Brad Shurts`,
            "compositionText": `I am king of the clouds,
I puff and billow
I roll and rumble
I cry and I fly,
My queen of the skies.

I am king of the fish,
I breach and dive
I hunt and thrash
I swim where I please,
My queen of the seas.

I am king of the field,
I am the fruit and the wheat
I am the planting and the harvest
I am nature's rebirth,
My queen of the earth.

I am king of the day,
I rise and fall
I warm and I guide
I am the hand of something higher,
My queen of fire.`,
            "tags": [`relationship`, `marriage`]
        },
        {
            "_id": `000000000000000000000004`,
            "compositionTitle": `What's Wrong With My Closet?`,
            "compositionAuthor": `Brad Shurts`,
            "compositionText": `Here's a tale of a tail
That I saw in my closet.
It was green, it was mean,
It was dirty and it knows it.
Slither slather -
Wither wather!

My eyes got big,
And next I saw
Some feet in my closet.
Under my clothes, the little gnomes
Were smelly and they know it.
Sniffle snaffle -
Wiffle waffle!

My eyes were big,
My nose got scrunched,
And next I heard
Some laughter in my closet.
The fairies took joy with all my toys,
They're messy and they know it.
Giggle gaggle -
Wiggle waggle!

My eyes were big,
My nose was scrunched,
My ears turned red,
And then I felt
Something grimy in my closet.
Goblin crumbs got on my thumbs,
That's icky and they know it.
Sticky stacky -
Wicky wacky!

My eyes were big,
My nose was scrunched,
My ears were red,
My hands made fists,
I had enough!
I told my mom
I couldn't clean my closet!

Her eyes got big!
Her nose got scrunched!
Her ears got red!
Her hands made fists!

... and then I cleaned my closet.`,
            "tags": [`childrens`,`playful`]
        },
        {
            "_id": `000000000000000000000005`,
            "compositionTitle": `A Short Long Story`,
            "compositionAuthor": `Brad Shurts`,
            "compositionText": `An old monk wearing nothing but his clothes climbed down from a mountain.  As he walked away, he stopped and looked over his shoulder, paused, then continued walking. Once again he stopped and looked back. The mountain looked smaller than before and he frowned.  If only problems were mountains.`,
            "tags": [`short story`]
        },
        {
            "_id": `000000000000000000000006`,
            "compositionTitle": `Father's Song`,
            "compositionAuthor": `Brad Shurts`,
            "compositionText": `I've walked across mountains and valleys
Seen starlit oceans and the darkest alleys
But I've traveled alone so long
I falter now, to sing the song
Of strength, peace, happiness and joy
I knew so well as a boy
The language seems foreign, I don't understand
But I hear the echo and it steadies my hand
To find the source feels right in my heart
I looked around but don't know where to start`,
            "tags": [`journey`, `experience`]
        },
        {
            "_id": `000000000000000000000007`,
            "compositionTitle": `The Nose Hair`,
            "compositionAuthor": `Brad Shurts`,
            "compositionText": `Why, little one, must you stray?
You have a warm place to lay
I knew not your plot until I got home
When the bathroom mirror revealed thy form

At what hour did you dare escape?
Who else saw thy thin black shape?
You've caused me pain, hair so vain
My day was a parade, and thee, the rain

With tweezers in hand I grab thy strand
With quick twist of the wrist my...
Wait, I feel nothing, I missed
So with tweezers in hand I grab thy strand
And with quick twist of the wrist my eyes mist

There you are held by cheap metal
My nose a rose and thee a black petal
A bitter end to a sweet day
Stray too far and you will pay`,
            "tags": [`funny`,`humility`]
        },
        {
            "_id": `000000000000000000000008`,
            "compositionTitle": `More On Writing`,
            "compositionAuthor": `Brad Shurts`,
            "compositionText": `Some days its Angel Falls in my head
The sun hits the mist and I begin at red
Then explore the morning of orange and yellow
In fields of green the scene starts to mellow
Blue waves crash and reshape the shore
Eve ignites indigo, a soothing flame I implore
Under the crown of violet what began has ended
And with the sum of it all a blank page becomes splendid`,
            "tags": [`meta`,`writing`,`color`,`internal rhyme`]
        },
        {
            "_id": `000000000000000000000010`,
            "compositionTitle": `Where The Sidewalk Ends`,
            "compositionAuthor": `Shel Silverstein`,
            "compositionText": `There is a place where the sidewalk ends
and before the street begins,
and there the grass grows soft and white,
and there the sun burns crimson bright,
and there the moon-bird rests from his flight
to cool in the peppermint wind.

Let us leave this place where the smoke blows black
and the dark street winds and bends.
Past the pits where the asphalt flowers grow
we shall walk with a walk that is measured and slow
and watch where the chalk-white arrows go
to the place where the sidewalk ends.

Yes we'll walk with a walk that is measured and slow,
and we'll go where the chalk-white arrows go,
for the children, they mark, and the children, they know,
the place where the sidewalk ends. `,
            "tags": [`classic`]
        }
        // {
        //     "_id": `000000000000000000000001`,
        //     "compositionTitle": ``,
        //     "compositionAuthor": ``,
        //     "compositionText": ``,
        //     "tags": [``]
        // }
    ]

    return jsonData
};