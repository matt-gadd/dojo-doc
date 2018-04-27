/*//@ts-ignore
import UIkit from 'uikit';
//@ts-ignore
import Icons from 'uikit/dist/js/uikit-icons';*/
import 'uikit';

import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import App from './widgets/App';

const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.append();
