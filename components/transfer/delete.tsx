
export function deleteTransfer(id:string) {
    const deleteEndpoint = `http://localhost:8080/transfer/${id}`;
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
fetch(deleteEndpoint, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du transfert');
            }
            console.log('Transfert supprimé avec succès');
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}
