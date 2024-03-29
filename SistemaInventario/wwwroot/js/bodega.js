﻿let datatable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    datatable = $('#tblDatos').DataTable({
        "language": {
            "lengthMenu": "Mostrar _MENU_ Registros Por Pagina",
            "zeroRecords": "Ningun Registro",
            "info": "Mostrar pagina _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros",
            "infoFiltered": "(filtrado de _MAX_ registros totales)",
            "search": "Buscar",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "ajax": {
            "url":"/Admin/Bodega/ObtenerTodos"
        },
        "columns": [
            { "data": "nombre", "width": "20%" },
            { "data": "descripcion", "width": "40%" },
            {
                "data": "estado",
                "render": function (data) {
                    if (data == true) {
                        return "Activo";
                    }
                    else {
                        return "Inactivo";
                    }
                }, "width":"20%"
            },
            {  "data": "id",
                "render": function (data) {
                    return`
                            <div class="text-center">
                                <a href="/Admin/Bodega/Upsert/${data}" class="btn btn-success text-while" style="cursor:pointer">
                                    <i class="bi bi-pencil-square"></i>
                                </a>
                                 <a onclick=Delete("/Admin/Bodega/Delete/${data}") class="btn btn-danger text-while" style="cursor:pointer">
                                    <i class="bi bi-trash3-fill"></i>
                                 </a>
                            </div >         
                         `;
                            
                        
                }, "width": "20%"
            }
        ]

    });


}

function Delete(url) {
    swal({
        title: "Esta seguro de Eliminar la bodega?",
        text: "Este Registro no se podra recuperar",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((borrar) => {
        if (borrar) {
            $.ajax({
                type: "POST",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        datatable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    });
}