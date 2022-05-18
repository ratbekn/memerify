import { FunctionComponent, ReactElement } from "react";

type BlockProps = {
    content: string
}

const Block: FunctionComponent<BlockProps> = ({ content}): ReactElement => {
    return <div>{content}</div>
}

export default Block
