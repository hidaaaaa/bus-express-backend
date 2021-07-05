let json ;
async function findTickets(){
	if($('#date-cancle').val().length <= 0) {
		document.querySelector('#buttonDuyetVeHuy').disabled = true;
		return alert("Vui lòng điền ngày")
	}
	const response = await fetch(`http://localhost:5000/ticket/cancled/${$('#date-cancle').val().split('/').reverse().join("-")}`)
	const data  = await response.json();
	var index =0;
		if(data.length <= 0) {
			alert("Không có vé hủy")
			return document.querySelector('#buttonDuyetVeHuy').disabled = true;
		}
		$(".trash").remove();
		json = data;
		for(var i=0;i < data.length;i++){
			if(true){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].MaVeXe+'</td>'+'<td>'+data[i].Email+'</td>'+'<td>'+data[i].STK+'</td>'+'<td>'+data[i].DonGia+'</td>'+'<td>'+data[i].NgayHuy+'</td>'+'<td>'+data[i].TinhTrang+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-duyetvehuy").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}else{
					$("#table-duyetvehuy").append(
						'<tr height="50px" class="trash">'+element);
				}
				index++;
			}
		}
		document.querySelector('#buttonDuyetVeHuy').disabled = false;
}
	async function approve(){
		console.log("CLiked")
		const res = await fetch(`http://localhost:5000/approveall/${$('#date-cancle').val().split('/').reverse().join("-")}`);
			const data = await res.json();
			if(data.is == false) return alert("Duyệt không thành công")
				alert("Duyệt thành công")
			exportCSV(json,"cancledTickets",true);
			window.location.href =window.location.href
	}
	function exportCSV(JSONData, ReportTitle, ShowLabel) {     

		//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
		var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
		var CSV = '';    
		//This condition will generate the Label/Header
		if (ShowLabel) {
			var row = "";
		
			//This loop will extract the label from 1st index of on array
			for (var index in arrData[0]) {
				//Now convert each value to string and comma-seprated
				row += index + ',';
			}
			row = row.slice(0, -1);
			//append Label row with line break
			CSV += row + '\r\n';
		}
		
		//1st loop is to extract each row
		for (var i = 0; i < arrData.length; i++) {
			var row = "";
			//2nd loop will extract each column and convert it in string comma-seprated
			for (var index in arrData[i]) {
				row += '"' + arrData[i][index] + '",';
			}
			row.slice(0, row.length - 1);
			//add a line break after each row
			CSV += row + '\r\n';
		}
		
		if (CSV == '') {        
			alert("Invalid data");
			return;
		}   
		
		//this trick will generate a temp "a" tag
		var link = document.createElement("a");    
		link.id="lnkDwnldLnk";
		
		//this part will append the anchor tag and remove it after automatic click
		document.body.appendChild(link);
		
		var csv = CSV;  
		blob = new Blob([csv], { type: 'text/csv' }); 
		var csvUrl = window.webkitURL.createObjectURL(blob);
		var filename = 'UserExport.csv';
		$("#lnkDwnldLnk")
		.attr({
			'download': filename,
			'href': csvUrl
		}); 
		
		$('#lnkDwnldLnk')[0].click();    
		document.body.removeChild(link);
		}