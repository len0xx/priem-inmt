export async function GET({ params }) {
    // `params.id` comes from [id].js
    const programId = params.id

    if (programId) {
        return {
            status: 200,
            headers: {},
            body: { programId }
        }
    }

    return {
        status: 404
    }
}