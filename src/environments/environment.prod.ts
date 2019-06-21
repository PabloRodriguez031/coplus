export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDxnGarz_EcZ9mV71nw9TDKK2UmnCv7x7w",
    authDomain: "panel-coplus.firebaseapp.com",
    databaseURL: "https://panel-coplus.firebaseio.com",
    projectId: "panel-coplus",
    storageBucket: "panel-coplus.appspot.com",
    messagingSenderId: "171184374814"
  },
  dtOptions: {
    pagingType: 'full_numbers',
    pageLength: 25,
    language: {
        'emptyTable': 'No hay información',
        'info': 'Mostrando _START_ a _END_ de _TOTAL_ Entradas',
        'infoEmpty': 'Mostrando 0 to 0 of 0 Entradas',
        'infoFiltered': '(Filtrado de _MAX_ total entradas)',
        'infoPostFix': '',
        'thousands': ',',
        'lengthMenu': 'Mostrar _MENU_ Entradas',
        'loadingRecords': 'Cargando...',
        'processing': 'Procesando...',
        'search': 'Buscar:',
        'zeroRecords': 'Sin resultados encontrados',
        'paginate': {
            'first': 'Primero',
            'last': 'Último',
            'next': 'Siguiente',
            'previous': 'Anterior'
        }
    }
}
};
