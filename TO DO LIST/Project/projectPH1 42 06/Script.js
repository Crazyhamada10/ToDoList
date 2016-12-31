$(document).ready(function()
{
    var flag = 1;
    var counter = 0;
    $("#whole").css("display","none");  
    var tall   = $("#tall").DataTable();
    var tcomp  = $("#tcomp").DataTable();
    var tprog  = $("#tprog").DataTable();
    var tarchi = $("#tarchi").DataTable();
    var everyThing = [];
    $("#tarchi_wrapper").hide();
    $("#tcomp_wrapper").hide();
    $("#tprog_wrapper").hide();

    $("#start").click(function()
    {
        $("#home").hide();
        $("#whole").show();
    });
        
    $("#gostart").click(function()
    {
        $("#home").show();
        $("#whole").hide();          
    });

    $('#log').click(function()
    {
        $('#signin').show();  
    });

    $('#log2').click(function()
    {
        $('#signin').show();  
    });

    $('#cancel').click(function()
    {
          $('#signin').hide();  
    });

    $('#addb').click(function()
    {
        $('#tabledata').show();
        $('#namesave').focus();
    });

    $('#delb').click(function()
    {
        $('#delok').show();
        $('#delcancel').show();
        $('#delb').hide();
        $('#addb').hide();
        $('table tr td div.checkbox').css("display","inline-block");
    });

    $('#delcancel').click(function()
    {
       	$(":checked").attr('checked',false);	
    	$('#delok').hide();
        $('#delcancel').hide();
        $('#delb').show();
        $('#addb').show();
        $('div.checkbox').css("display","none");
    });

    $('#delok').click(function()
    {
    	//////////////
    	if (confirm("Are you sure to delete the checked tasks?") == true) 
    	{
    		$(":checked").each(function()
	    	{
	    			if (this.checked)
			    	{
						var dtable;
				        if(flag==1)
				        {
					        dtable = tall;
				        }
				        else if(flag==2)
				        {
				            dtable = tcomp; 
				        }
				        else if(flag==3)
				        {
				        	dtable = tarchi;
				        }
				        else if(flag==4)
				        {
				        	dtable = tprog;
				        }
					        thisRow=$(this).parents('tr');
				        var km = dtable.row(thisRow).index();
				        var rowman = dtable.row(km).data();

				        var check_arr = [tall, tcomp, tarchi, tprog];
				        for (var na =0;na<4;na++)
				        {
				        	var length_arr = countrows(check_arr[na]);
				        	for (var th=0;th<length_arr;th++)
				        	{
				        		if(String(check_arr[na].row(th).data()) == String(rowman))
				        		{
				        			check_arr[na].row(th).remove().draw();
				        		}
				        	}
			        }
			        $("#b1").html(countrows(tall));
			        $("#b2").html(countrows(tcomp));
				   	$("#b3").html(countrows(tarchi));
			      	$("#b4").html(countrows(tprog));	
	        	}
	        });        
    	} 
    	else 
    	{
    		$(":checked").attr('checked',false);
        }
    	///////////////
    	$('#delok').hide();
        $('#delcancel').hide();
        $('#delb').show();
        $('#addb').show();
        $('div.checkbox').css("display","none");
    });

    $('#datacancel').click(function()
    {
        $('#tabledata').hide();
        document.getElementById('namesave').value="";
        document.getElementById('discriptionsave').value="";
        document.getElementById('datesave').value=null;
        $("#error").fadeOut();
        $("#error2").fadeOut();			
    });

    $('#datasave').click(function()
    {
        var nam  = document.getElementById('namesave').value;
        var des  = document.getElementById('discriptionsave').value;
        /////////////////
        if (nam.length > 40)
        {
        	var stringer = nam;
        	nam = "";
        	for (var t=0; t<stringer.length; t+=40)
        	{
        		nam+=stringer.slice(t,t+39) + "<br>";
        	}
        }
		if (des.length > 40)
        {
        	var stringer = des;
        	des = "";
        	for (var t=0; t<stringer.length; t+=40)
        	{
        		des+=stringer.slice(t,t+39) + "<br>";
        	}
        }
        /////////////////
        var dat  = document.getElementById('datesave').value;
		this.child = $(document.getElementById('shit')).clone();
		this.child.attr("id", "goes");
		this.child.attr("class", "goes dropdown");
		this.test1 = $(this.child.children().children().children()[0]);
		this.test1.attr("class","edit");
		this.test2 = $(this.child.children().children().children()[1]);
		this.test2.attr("class","mark");
		this.test3 = $(this.child.children().children().children()[2]);
		this.test3.attr("class","starc");
		this.test4 = $(this.child.children().children().children()[3]);
		this.test4.attr("class","del");
		/////////////////////
  		this.child1 = $(document.getElementById('checkdelete')).clone();
    	this.child1.attr("id", "ncheck");
    	this.child1.attr("class", "ncheck checkbox");
		/////////////////////
		var checker = 0;
		var arr = [this.child1.wrap('<div>').parent().html(),String(nam),String(des),String(dat),this.child.wrap('<div>').parent().html()];
		for (var xv=0;xv<everyThing.length;xv++)
		{
			if (String(everyThing[xv]) == String(arr))
			{
				checker = 1;
			}	
		}	
        if(document.getElementById('namesave').value=="" || !document.getElementById('namesave').value.replace(/\s+/g, ''))
        {
            $("#error").fadeIn();
        }
        else if (checker == 1)
        {
        	$("#error2").fadeIn();
        }
        else
        {
        	everyThing.push(arr);
            tall.row.add(arr).draw();
            tprog.row.add(arr).draw();
            //document.getElementById("b1").innerHTML = document.getElementById('tall').rows.length-2;
            $("#b1").html(countrows(tall));
            $("#b4").html(countrows(tprog));
            $('#tabledata').hide();
            document.getElementById('namesave').value="";
            document.getElementById('discriptionsave').value="";
            document.getElementById('datesave').value=null;
            $("#error").fadeOut();
            $("#error2").fadeOut();
        }
    });
        
    
	$('tbody').on( 'click', 'tr', function () 
	{
    	$('td').off('click', '.edit').on('click', '.edit',function()
    	{
	        var dtable;
            if(flag==1)
	        {
		        dtable = tall;
	        }
	        else if(flag==2)
	        {
	            dtable = tcomp; 
	        }
	        else if(flag==3)
	        {
	        	dtable = tarchi;
	        }
	        else if(flag==4)
	        {
	        	dtable = tprog;
	        }
	        thisRow = $(this).parents('tr');
	        var km = dtable.row(thisRow).index();
	        var rowman = dtable.row(km).data();
	        $('#nameedit').val(rowman[1]);
	        $('#discriptionedit').val(rowman[2]);
	        $('#dateedit').val(rowman[3]);
	        $('#tableedit').show();	
    	});

    	$('td').off('click', '.mark').on('click', '.mark',function()
    	{
    		var checker =0;
	    	var dtable;
            if(flag==1)
	        {
		        dtable = tall;
	        }
	        else if(flag==2)
	        {
	            dtable = tcomp;
	        }
	        else if(flag==3)
	        {
	        	dtable = tarchi;
	        }
	        else if(flag==4)
	        {
	        	dtable = tprog;
	        }
	  	    thisRow= $(this).parents('tr');
		    var km = dtable.row(thisRow).index();
	        var rowman = dtable.row(km).data();
    	    var testing = 0;
	        var length_arr = countrows(tcomp);
	        for (var th=0;th<length_arr;th++)
	       	{	
	       		if(String(tcomp.row(th).data()) == String(rowman))
	       		{
	       			testing = 1;
	       		}
	      	}
	        if (testing == 0)
	        {
	        	tcomp.row.add(rowman).draw();
		        length_arr = countrows(tall);
		        var thog = 0;
		       	for (var th=0;th<length_arr;th++)
		       	{	
		       		if(String(tall.row(th).data()) == String(rowman))
		       		{
		       			thog = 1;
		       			var newstrike = rowman;
		       			newstrike[1] = newstrike[1].strike();
		       			tall.row(th).data(newstrike);
		       		}
		      	}
		      	if (thog == 0)
		      	{
		      			var newstrike = rowman;
		       			newstrike[1] = newstrike[1].strike();
		      			tall.row.add(newstrike).draw();
		      	}	        
				length_arr = countrows(tprog);
		       	for (var th=0;th<length_arr;th++)
		       	{	
		       		if(String(tprog.row(th).data()) == String(rowman))
		       		{
		       			tprog.row(th).remove().draw();
		       		}
		      	}
				length_arr = countrows(tarchi);
		       	for (var th=0;th<length_arr;th++)
		       	{	
		       		if(String(tarchi.row(th).data()) == String(rowman))
		       		{
		       			tarchi.row(th).remove().draw();
		       		}
		      	}
		      	$("#b1").html(countrows(tcomp));
		      	$("#b2").html(countrows(tcomp));
		      	$("#b3").html(countrows(tarchi));
		      	$("#b4").html(countrows(tprog));
	    	}
	    	else
	    	{
	    		alert('This task is already marked as completed');
	    	}
    	});

    	$('td').off('click', '.starc').on('click', '.starc',function()
    	{
    		var dtable;
            if(flag==1)
	        {
		        dtable = tall;
	        }
	        else if(flag==2)
	        {
	            dtable = tcomp;
	        }
	        else if(flag==3)
	        {
	        	dtable = tarchi;
	        }
	        else if(flag==4)
	        {
	        	dtable = tprog;
	        }
	        
  	        thisRow=$(this).parents('tr');
	        var km = dtable.row(thisRow).index();
	        var rowman = dtable.row(km).data();	
    	    var testing = 0;
    	    var testing2 = 0;
	        var length_arr = countrows(tcomp);
	        for (var th=0;th<length_arr;th++)
	       	{	
	       		if(String(tcomp.row(th).data()) == String(rowman))
	       		{
	       			testing = 1;
	       		}
	      	}

	        length_arr = countrows(tarchi);
	        for (var th=0;th<length_arr;th++)
	       	{	
	       		if(String(tarchi.row(th).data()) == String(rowman))
	       		{
	       			testing2 = 1;
	       		}
	      	}
	      	if (testing == 0 && testing2 == 0)
	      	{
	      		tarchi.row.add(rowman).draw();
	      		var check_arr = [tall, tprog];
		        for (var na =0;na<2;na++)
		        {
		        	var length_arr = countrows(check_arr[na]);
		        	for (var th=0;th<length_arr;th++)
		        	{
		        		if(String(check_arr[na].row(th).data()) == String(rowman))
		        		{
		        			check_arr[na].row(th).remove().draw();
		        		}
		        	}
		        }
		      	$("#b1").html(countrows(tall));
		      	$("#b3").html(countrows(tarchi));
		      	$("#b4").html(countrows(tprog));
	      	}
	      	else if(testing == 1)
	      	{
	      		alert("You can't archieve a completed task");
	      	}
	      	else
	      	{
	      		alert('This task is already set archieved');
	      	}
    	});

    	$('td').off('click', '.del').on('click', '.del',function()
    	{
	    	if (confirm("Are you sure to delete the checked tasks?") == true) 
    		{
	    		var dtable;
	            if(flag==1)
		        {
			        dtable = tall;
		        }
		        else if(flag==2)
		        {
		            dtable = tcomp; 
		        }
		        else if(flag==3)
		        {
		        	dtable = tarchi;
		        }
		        else if(flag==4)
		        {
		        	dtable = tprog;
		        }
	  	        thisRow=$(this).parents('tr');
		        var km = dtable.row(thisRow).index();
		        var rowman = dtable.row(km).data();

		        var check_arr = [tall, tcomp, tarchi, tprog];
		        for (var na =0;na<4;na++)
		        {
		        	var length_arr = countrows(check_arr[na]);
		        	for (var th=0;th<length_arr;th++)
		        	{
		        		if(String(check_arr[na].row(th).data()) == String(rowman))
		        		{
		        			check_arr[na].row(th).remove().draw();
		        		}
		        	}
		        }
		        $("#b1").html(countrows(tall));
		        $("#b2").html(countrows(tcomp));
			   	$("#b3").html(countrows(tarchi));
		      	$("#b4").html(countrows(tprog));
		    }    
    	});
   	});

	function countrows(input)
	{
		switch(input)
		{
			case tall:
		        if ($("#tall tbody  tr").length == 1 && tall.row(0).data() == undefined)
    			{
    				return 0;
    			}
				return $("#tall tbody  tr").length;
				break;
			case tcomp:
				if ($("#tcomp tbody  tr").length == 1 && tcomp.row(0).data() == undefined)
    			{
    				return 0;
    			}
				return $("#tcomp tbody  tr").length;
				break;
			case tarchi:
				if ($("#tarchi tbody  tr").length == 1 && tarchi.row(0).data() == undefined)
    			{
    				return 0;
    			}
				return $("#tarchi tbody  tr").length;
				break;
			case tprog:
				if ($("#tprog tbody  tr").length == 1 && tprog.row(0).data() == undefined)
    			{
    				return 0;
    			}
				return $("#tprog tbody  tr").length;
				break;
		}
	}

    $('#dataedit').click(function()
    {
        var dtable;
        var checker = 0;
        if(flag==1)
        {
	        dtable = tall;
        }
        else if(flag==2)
        {
            dtable = tcomp;
        }
        else if(flag==3)
        {
        	dtable = tarchi;
        }
        else if(flag==4)
        {
        	dtable = tprog;
        }
        var km = dtable.row(thisRow).index();
        var rowman = [5];
        rowman[0] = dtable.row(km).data()[0];
        rowman[1] = $('#nameedit').val();
        rowman[2] = $('#discriptionedit').val();
        rowman[3] = $('#dateedit').val();
        rowman[4] = dtable.row(km).data()[4];
        /////////////////
        if (rowman[1].length > 40)
        {
        	var stringer = rowman[1];
        	rowman[1] = "";
        	for (var t=0; t<stringer.length; t+=40)
        	{
        		rowman[1]+=stringer.slice(t,t+39) + "<br>";
        	}
        }
		if (rowman[2].length > 40)
        {
        	var stringer = rowman[2];
        	rowman[2] = "";
        	for (var t=0; t<stringer.length; t+=40)
        	{
        		rowman[2]+=stringer.slice(t,t+39) + "<br>";
        	}
        }
        /////////////////
        var check_arr = [tall, tcomp, tarchi, tprog];
        for (var na =0;na<4;na++)
        {
        	var length_arr = countrows(check_arr[na]);
        	for (var th=0;th<length_arr;th++)
        	{
        		if(String(check_arr[na].row(th).data()) == String(rowman))
        			checker = 1;
        	}
        }
        if (rowman[1] == "" || !rowman[1].replace(/\s+/g, ''))
        {
  			$("#erroredit").fadeIn();
        }
        else if (checker == 1)
        {
  			$("#error2edit").fadeIn();
        }
        else
        {
        	var temp = dtable.row(km).data();
	      	for (var nh=0;nh<4;nh++)
	        {
	        	var length_arr = countrows(check_arr[nh]);
	        	for (var th=0;th<length_arr;th++)
	        	{	
	        		if(String(check_arr[nh].row(th).data()) == String(temp))
	        		{
	        			check_arr[nh].row(th).data(rowman);
	        		}
	        	}
	        }
	        $('#tableedit').hide();
	        $('#nameedit').val("");
	        $('#discriptionedit').val("");
	        $('#dateedit').val(null);
	        $("#erroredit").fadeOut();
	        $("#error2edit").fadeOut();
		}
    });

    $('#datacanceledit').click(function()
    {
        $('#tableedit').hide();
        $('#nameedit').val("");
        $('#discriptionedit').val("");
        $('#dateedit').val(null);
        $("#error2edit").fadeOut();
        $("#erroredit").fadeOut();
    });


    //btn btn-info btn-block
    //btn btn-primary btn-block
    $('#i1').click(function()
    {
	    flag=1; 
	    $('#i1').attr('class', 'btn btn-primary btn-block');
	    $('#i2').attr('class', 'btn btn-info btn-block');
   	    $('#i3').attr('class', 'btn btn-info btn-block');
	   	$('#i4').attr('class', 'btn btn-info btn-block');
	    $("#tall_wrapper").show();
	    $("#tcomp_wrapper").hide();
	    $("#tarchi_wrapper").hide();
	    $("#tprog_wrapper").hide();	
	});

    $('#i2').click(function()
    {
	    flag=2;
	    $('#i2').attr('class', 'btn btn-primary btn-block');
	    $('#i1').attr('class', 'btn btn-info btn-block');
   	    $('#i3').attr('class', 'btn btn-info btn-block');
	   	$('#i4').attr('class', 'btn btn-info btn-block');  
	    $("#tcomp_wrapper").show();
	    $("#tall_wrapper").hide();
	    $("#tarchi_wrapper").hide();
	    $("#tprog_wrapper").hide();
	});

    $('#i3').click(function()
	{
		flag=3;  
	    $('#i3').attr('class', 'btn btn-primary btn-block');
	    $('#i2').attr('class', 'btn btn-info btn-block');
   	    $('#i1').attr('class', 'btn btn-info btn-block');
	   	$('#i4').attr('class', 'btn btn-info btn-block');
		$("#tarchi_wrapper").show();
		$("#tall_wrapper").hide();
		$("#tcomp_wrapper").hide();
		$("#tprog_wrapper").hide();    
	});

    $('#i4').click(function()
    {
        flag=4;
	    $('#i4').attr('class', 'btn btn-primary btn-block');
	    $('#i2').attr('class', 'btn btn-info btn-block');
   	    $('#i3').attr('class', 'btn btn-info btn-block');
	   	$('#i1').attr('class', 'btn btn-info btn-block');  
        $("#tprog_wrapper").show();
        $("#tall_wrapper").hide();
        $("#tcomp_wrapper").hide();
        $("#tarchi_wrapper").hide();
	});
});