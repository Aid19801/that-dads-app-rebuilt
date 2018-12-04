import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
  .configure() // controls connection & communication settings
  .use(reactotronRedux())
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!

  export default reactotron;


  // examples of reactotron logging: 

  // Reactotron.log('Hello worlllllld');
  // Reactotron.warn('*glares*')
  // Reactotron.warn({ numbers: [1, 2, 3] })

  // Reactotron.display({
  //   name: 'KNOCK KNOCK',
  //   preview: 'Who\'s there?',
  //   value: 'Orange.'
  // })
