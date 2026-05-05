<script>
  import PostCard from './PostCard.svelte';

  import Corrobot1 from '@images/GamePreviews/Corrobot1.png';
  import Corrobot2 from '@images/GamePreviews/Corrobot2.png';
  import Corrobot3 from '@images/GamePreviews/Corrobot3.png';

  import Blood1 from '@images/GamePreviews/Blood1.png';
  import Blood2 from '@images/GamePreviews/Blood2.png';
  import Blood3 from '@images/GamePreviews/Blood3.png';
  import Blood4 from '@images/GamePreviews/Blood4.png';
  import Blood5 from '@images/GamePreviews/Blood5.png';

  import Time1 from '@images/GamePreviews/Time1.png';
  import Time2 from '@images/GamePreviews/Time2.png';
  import Time3 from '@images/GamePreviews/Time3.png';
  import Time4 from '@images/GamePreviews/Time4.png';
  import Time5 from '@images/GamePreviews/Time5.png';

  const games = [
    {
      title: 'Corrobot-rebounce',
      description: 'A 3D sequel to Corrobot-Takeover',
      jam: {
        name: 'Nordic gamejam 2024',
        url: 'https://itch.io/jam/nordic-game-jam-2024/rate/2659665'
      },
      viewUrl: 'https://botalex.itch.io/corrobot-rebounce',
      images: [Corrobot1, Corrobot2, Corrobot3]
    },
    {
      title: 'Unnamed blood game',
      description: 'A game based on an unique kind of combat',
      jam: {
        name: 'Future Game Makers',
        url: 'https://itch.io/jam/future-game-makers-jam-2024'
      },
      viewUrl: 'https://botalex.itch.io/mop-of-the-dead',
      images: [Blood1, Blood2, Blood3, Blood4, Blood5]
    },
    {
      title: 'One More Time',
      description: 'What if time was money? A roguelike where you need to kill for time, which you can choose to spend.',
      jam: {
        name: 'Denmark Masters jam',
        url: 'https://itch.io/jam/dmspiljam-november-2021'
      },
      viewUrl: 'https://botalex.itch.io/one-more-time',
      images: [Time1, Time2, Time3, Time4, Time5]
    }
  ];
</script>

<div class="grid grid-flow-row gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {#each games as game (game.title)}
    <PostCard
      title={game.title}
      description={game.description}
      jam={game.jam}
      viewUrl={game.viewUrl}
      images={game.images}
    />
  {/each}

  <!-- placeholder for upcoming game -->
  <PostCard placeholder={true} />
</div>

