import TestView from '@/views/TestView';

import ButtonView from '@/views/ButtonView';
import CheckboxView from '@/views/CheckboxView';
import DividerView from '@/views/DividerView';
import DropGroupView from '@/views/DropGroupView';
import LoadingView from '@/views/LoadingView';
import MessageView from '@/views/MessageView';
import ProgressView from '@/views/ProgressView';
import TreeView from '@/views/TreeView';
import SelectView from '@/views/SelectView';
import TreeSelectView from '@/views/TreeSelectView';
import TriggerView from '@/views/TriggerView';

export interface routerProps {
    name: string
    path: string
    component: any
}

const routes: routerProps[] = [
    { name: 'Test', path: '/testview', component: TestView },
    { name: 'Button', path: '/buttonview', component: ButtonView },
    { name: 'Checkbox', path: '/checkboxview', component: CheckboxView },
    { name: 'Divider', path: '/dividerview', component: DividerView },
    { name: 'DropGroup', path: '/dropgroupview', component: DropGroupView },
    { name: 'Loading', path: '/loadingview', component: LoadingView },
    { name: 'Message', path: '/messageview', component: MessageView },
    { name: 'Progress', path: '/progressview', component: ProgressView },
    { name: 'Tree', path: '/treeview', component: TreeView },
    { name: 'Select', path: '/selectview', component: SelectView },
    { name: 'TreeSelect', path: '/treeselectview', component: TreeSelectView },
    { name: 'Trigger', path: '/triggerview', component: TriggerView }
];

export default routes;
