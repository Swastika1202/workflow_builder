export const NODE_TYPES = {
    START: 'start',
    ACTION: 'action',
    BRANCH: 'branch',
    END: 'end',
};

export const INITIAL_STATE = {
    nodes: {
        'start-1': {
            id: 'start-1',
            type: 'start',
            label: 'Start',
            children: [],
        },
    },
    rootId: 'start-1',
};
