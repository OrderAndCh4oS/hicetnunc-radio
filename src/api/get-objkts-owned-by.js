import { gql, request } from 'graphql-request';

const query = gql`
    query AudioObjktData($ownerId: String!) {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_eq: $ownerId}
            }
            creator_id: {_neq: $ownerId}
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

const getObjktsOwnedBy = async(walletId) => {
    const response = await request(
        'https://api.hicdex.com/v1/graphql',
        query,
        {ownerId: walletId},
    );
    return response.hic_et_nunc_token || [];
};

export default getObjktsOwnedBy;
