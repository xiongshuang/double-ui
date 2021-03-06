import { ReactNode } from 'react';

type Fn = () => void;
export type Props = {
    type?: 'default' | 'blue' | 'green' | 'orange' | 'red' | 'word'
    size?: string
    htmlType?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    width?: number
    className?: string
    click?: Fn
    children?: ReactNode
}

declare function Button(props: Props): JSX.Element
export default Button;
