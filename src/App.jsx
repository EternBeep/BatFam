import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import './styles/screens.css';
import Loader from './components/Loader';
import CharSelect from './components/CharSelect';
import EasterEggs from './components/EasterEggs';

const BatTransition = lazy(() => import('./components/BatTransition'));
const MainSite = lazy(() => import('./components/MainSite'));
const NightwingTransition = lazy(() => import('./components/NightwingTransition'));
const NightwingMain = lazy(() => import('./components/NightwingMain'));
const RedHoodTransition = lazy(() => import('./components/RedHoodTransition'));
const RedHoodMain = lazy(() => import('./components/RedHoodMain'));
const RedRobinTransition = lazy(() => import('./components/RedRobinTransition'));
const RedRobinMain = lazy(() => import('./components/RedRobinMain'));
const DamianTransition = lazy(() => import('./components/DamianTransition'));
const DamianMain = lazy(() => import('./components/DamianMain'));

export default function App() {
  const [screen, setScreen] = useState('loader');
  const [character, setCharacter] = useState(null);

  // Navigate forward — pushes a history entry
  const goTo = useCallback((nextScreen, nextChar = character) => {
    setScreen(nextScreen);
    setCharacter(nextChar);
    window.history.pushState(
      { screen: nextScreen, character: nextChar },
      ''
    );
  }, [character]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPop = (e) => {
      if (e.state) {
        setScreen(e.state.screen);
        setCharacter(e.state.character);
      } else {
        // No state = went all the way back to start
        setScreen('loader');
        setCharacter(null);
      }
    };

    // Set initial history entry so the first back works
    window.history.replaceState({ screen: 'loader', character: null }, '');

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <Suspense fallback={null}>
      <EasterEggs />
      {screen === 'loader' && (
        <Loader onEnter={() => goTo('charSelect')} />
      )}

      {screen === 'charSelect' && (
        <CharSelect
          onSelect={(char) => {
            const selected = char || 'batman';
            goTo('transition', selected);
          }}
        />
      )}

      {/* Batman flow */}
      {screen === 'transition' && character === 'batman' && (
        <BatTransition onDone={() => goTo('main')} />
      )}
      {screen === 'main' && character === 'batman' && (
        <MainSite onBack={() => goTo('charSelect', null)} />
      )}

      {/* Nightwing flow */}
      {screen === 'transition' && character === 'nightwing' && (
        <NightwingTransition onDone={() => goTo('main')} />
      )}
      {screen === 'main' && character === 'nightwing' && (
        <NightwingMain onBack={() => goTo('charSelect', null)} />
      )}

      {/* Red Hood flow */}
      {screen === 'transition' && character === 'redhood' && (
        <RedHoodTransition onDone={() => goTo('main')} />
      )}
      {screen === 'main' && character === 'redhood' && (
        <RedHoodMain onBack={() => goTo('charSelect', null)} />
      )}

      {/* Red Robin flow */}
      {screen === 'transition' && character === 'redrobin' && (
        <RedRobinTransition onDone={() => goTo('main')} />
      )}
      {screen === 'main' && character === 'redrobin' && (
        <RedRobinMain onBack={() => goTo('charSelect', null)} />
      )}

      {/* Damian Wayne flow */}
      {screen === 'transition' && character === 'damian' && (
        <DamianTransition onDone={() => goTo('main')} />
      )}
      {screen === 'main' && character === 'damian' && (
        <DamianMain onBack={() => goTo('charSelect', null)} />
      )}
    </Suspense>
  );
}
