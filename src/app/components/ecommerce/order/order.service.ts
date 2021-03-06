// tslint:disable-next-line:max-file-line-count
// Ecommerce-Dashboard
// ====================================================================
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService
{
    public InitOrder(): any
    {
        let EditableTable: any =
            {
                // main function to initiate the module
                init(): any
                {
                    function restoreRow(oTable: any, nRow: any): any
                    {
                        let aData = oTable.fnGetData(nRow);
                        let jqTds = $('>td', nRow);

                        // tslint:disable-next-line:one-variable-per-declaration
                        for (let i = 0, iLen = jqTds.length; i < iLen; i++)
                        {
                            oTable.fnUpdate(aData[i], nRow, i, false);
                        }

                        oTable.fnDraw();
                    }

                    function editRow(oTable: any, nRow: any): any
                    {
                        let aData = oTable.fnGetData(nRow);
                        let jqTds = $('>td', nRow);
                        jqTds[0].innerHTML = '<input type="text" class="form-control small" value="' + aData[0] + '">';
                        jqTds[1].innerHTML = '<input type="text" class="form-control small" value="' + aData[1] + '">';
                        jqTds[2].innerHTML = '<input type="text" class="form-control small" value="' + aData[2] + '">';
                        jqTds[3].innerHTML = '<input type="text" class="form-control small" value="' + aData[3] + '">';
                        jqTds[4].innerHTML = '<a class="edit btn btn-default btn-warning btn-sm" href="">Save</a>';
                        jqTds[5].innerHTML = '<a class="cancel btn btn-default btn-danger btn-sm" href="">Cancel</a>';
                    }

                    function saveRow(oTable: any, nRow: any): any
                    {
                        let jqInputs = $('input', nRow);
                        oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                        oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                        oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                        oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                        oTable.fnUpdate('<a class="edit btn btn-default btn-info btn-sm" href="">Edit</a>', nRow, 4, false);
                        oTable.fnUpdate('<a class="delete btn btn-default btn-danger btn-sm" href="">Delete</a>', nRow, 5, false);
                        oTable.fnDraw();
                    }

                    function cancelEditRow(oTable: any, nRow: any): any
                    {
                        let jqInputs = $('input', nRow);
                        oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
                        oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
                        oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
                        oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
                        oTable.fnUpdate('<a class="edit btn btn-default btn-info btn-sm" href="">Edit</a>', nRow, 4, false);
                        oTable.fnDraw();
                    }

                    let oTable = $('#editable-sample').dataTable({
                        aLengthMenu: [
                            [5, 10, 15, 20, -1],
                            [5, 10, 15, 20, 'All'] // change per page values here
                        ],
                        // set the initial value
                        iDisplayLength: 5,
                        sDom: '<\'row\'<\'col-lg-6\'>>t<\'row\'<\'col-lg-6\'i><\'col-lg-6\'p>>',
                        sPaginationType: 'bootstrap',
                        oLanguage: {
                            sLengthMenu: '_MENU_ ',
                            oPaginate: {
                                sPrevious: 'Prev',
                                sNext: 'Next'
                            }
                        },
                        aoColumnDefs: [{
                            bSortable: false,
                            aTargets: [4]
                        }
                        ]
                    });

                    $('#editable-sample_wrapper .dataTables_filter input').addClass('form-control medium'); // modify table search input
                    $('#editable-sample_wrapper .dataTables_length select').addClass('form-control xsmall'); // modify table per page dropdown

                    let nEditing: any = null;

                    $('#editable-sample_new').click(function (e: any): any
                    {
                        e.preventDefault();
                        let aiNew = oTable.fnAddData(['', '', '', '',
                            '<a class="edit edit btn btn-default btn-warning btn-sm" href="">Edit</a>', '<a class="cancel btn btn-default btn-danger btn-sm" data-mode="new" href="">Cancel</a>'
                        ]);
                        let nRow = oTable.fnGetNodes(aiNew[0]);
                        editRow(oTable, nRow);
                        nEditing = nRow;
                    });

                    $('#editable-sample a.delete').live('click', function (e: any): any
                    {
                        e.preventDefault();

                        if (confirm('Are you sure to delete this row ?') === true)
                        {
                            return;
                        }

                        let nRow = $(this).parents('tr')[0];
                        oTable.fnDeleteRow(nRow);
                        alert('Deleted! Do not forget to do some ajax to sync with backend :)');
                    });

                    $('#editable-sample a.cancel').live('click', function (e: any): any
                    {
                        e.preventDefault();
                        if ($(this).attr('data-mode') === 'new')
                        {
                            let nRow = $(this).parents('tr')[0];
                            oTable.fnDeleteRow(nRow);
                        } else
                        {
                            restoreRow(oTable, nEditing);
                            nEditing = null;
                        }
                    });

                    $('#editable-sample a.edit').live('click', function (e: any): any
                    {
                        e.preventDefault();

                        /* Get the row as a parent of the link that was clicked on */
                        let nRow = $(this).parents('tr')[0];

                        if (nEditing !== null && nEditing !== nRow)
                        {
                            /* Currently editing - but not this row - restore the old before continuing to edit mode */
                            restoreRow(oTable, nEditing);
                            editRow(oTable, nRow);
                            nEditing = nRow;
                        } else if (nEditing === nRow && this.innerHTML === 'Save')
                        {
                            /* Editing this row and want to save it */
                            saveRow(oTable, nEditing);
                            nEditing = null;
                            alert('Updated! Do not forget to do some ajax to sync with backend :)');
                        } else
                        {
                            /* No edit in progress - let's start one */
                            editRow(oTable, nRow);
                            nEditing = nRow;
                        }
                    });
                }
            };

        EditableTable.init();

        let i = 1;
        $('#add_row').click(function (): any
        {
            $('#addr' + i).html('<td>' + (i + 1) + '</td><td><input name=\'name' + i + '\' type=\'text\' placeholder=\'Name\' class=\'form-control input-md\'  /> </td><td><input  name=\'mail' + i + '\' type=\'text\' placeholder=\'Mail\'  class=\'form-control input-md\'></td><td><input  name=\'mobile' + i + '\' type=\'text\' placeholder=\'Mobile\'  class=\'form-control input-md\'></td>');

            $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
            i++;
        });
        $('#delete_row').click(function (): any
        {
            if (i > 1)
            {
                $('#addr' + (i - 1)).html('');
                i--;
            }
        });

        $('#editable-table').editableTableWidget();
    }
}
