import { DefaultUi, Player, Youtube } from '@vime/react';
import { isYoutubeLink, getVideoId } from '../utils/youtube';

import '@vime/core/themes/default.css';

const YoutubePlayer = ({ videoId }) => {

  if (isYoutubeLink(videoId)) videoId = getVideoId(videoId);

  return (
    <div className="flex w-full aspect-video overflow-hidden rounded-md">
      <Player
        style={{
          width: '100%',
        }}
      >
        <Youtube videoId={videoId} />

        <DefaultUi />
      </Player>
    </div>
  );
};

export default YoutubePlayer;
