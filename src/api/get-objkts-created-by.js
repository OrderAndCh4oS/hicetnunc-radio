import { gql, request } from 'graphql-request';

const query = gql`
    query AudioObjktData($creatorId: String!) {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {
                    _neq: "tz1burnburnburnburnburnburnburjAYjjX"
                }
            }
            creator_id: {_eq: $creatorId}
        }, order_by: {id: desc}) {
            id
            display_uri
            description
            title
            thumbnail_uri
            mime
            creator_id
            artifact_uri
        }
    }
`;

const getObjktsCreatedBy = async(walletId) => {
    const response = await request(
        'https://api.hicdex.com/v1/graphql',
        query,
        {creatorId: walletId},
    );
    return response.hic_et_nunc_token || [];
};

export default getObjktsCreatedBy;
