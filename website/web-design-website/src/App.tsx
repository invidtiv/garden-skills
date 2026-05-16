import { Stage } from './stage/Stage';
import { ChapterHost } from './stage/ChapterHost';
import { ProgressBar } from './stage/ProgressBar';
import { useHotKeys } from './stage/useHotKeys';
import { stepStore, useStep } from './store/useStep';
import { chapters } from './chapters';

function App() {
  useHotKeys();
  const { chapterIndex } = useStep();
  const theme = chapters[chapterIndex]?.theme ?? 'light';

  return (
    <div
      onClick={(e) => {
        // Any ancestor with data-no-step does not trigger advancement
        const target = e.target as HTMLElement;
        if (target.closest('[data-no-step]')) return;
        stepStore.next();
      }}
    >
      <Stage theme={theme}>
        <ChapterHost />
      </Stage>
      <div data-no-step>
        <ProgressBar />
      </div>
    </div>
  );
}

export default App;
