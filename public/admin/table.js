$(document).ready(()=>{
	async function getAllUser(){
		$('.trash').remove();
		$("#table-user").attr('height',20);
		const response=await fetch('http://localhost:5000/getallUsers');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].name+'</td>'+'<td>'+data[i].email+'</td>'+'<td>'+data[i].role+'</td>'+'</tr>';
			if(i%2==1){
				$("#table-user").append(
					'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
				
			}else{
				$("#table-user").append(
					'<tr height="50px" class="trash">'+element);
				
			}
				
				
			}
	}
	getAllUser();
	
	async function getAllXe(){
		$('.trash').remove();
		$("#table-xe").attr('height',20);
		const response=await fetch('http://localhost:5000/xe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].BienSoXe+'</td>'+'<td>'+data[i].LoaiXe+'</td>'+'<td>'+String(data[i].SoLuongGhe)+'</td>'+'</tr>';
			if(i%2==1){
				$("#table-xe").append(
					'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
				
			}
			else{
				$("#table-xe").append(
					'<tr height="50px" class="trash">'+element);
				
			}
				
				
			}
	}
	
	async function getAllTuyenXe(){
		$('.trash').remove();
		$("#table-tuyenxe").attr('height',20);
		const response= await fetch('http://localhost:5000/tuyenxe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].MaTX+'</td>'+'<td>'+data[i].DiemDi+'</td>'+'<td>'+data[i].DiemDen+'</td>'+'<td>'+data[i].DonGia+'</td>'+'</tr>';
			if(i%2==1){
				$("#table-tuyenxe").append(
					'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
				
			}else{
				$("#table-tuyenxe").append(
					'<tr height="50px" class="trash">'+element);
				
			}
				
				
		}
	}
	
	async function getAllChuyenXe(){
		$('.trash').remove();
		$("#table-chuyenxe").attr('height',20);
		const response= await fetch('http://localhost:5000/chuyenxe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			var date=new Date(data[i].NgayDi).toLocaleDateString();
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].MaCX+'</td>'+'<td>'+data[i].MaTX+'</td>'+'<td>'+data[i].BienSoXe+'</td>'+'<td>'+date+'</td>'+'<td>'+data[i].GioDi+'</td>'+'</tr>';
			if(i%2==1){
				$("#table-chuyenxe").append(
					'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
				
			}else{
				$("#table-chuyenxe").append(
					'<tr height="50px" class="trash">'+element);
				
			}
				
				
			}
	}
	
	async function getAllKhachHang(){
		$('.trash').remove();
		$("#table-khachhang").attr('height',20);
		const response= await fetch('http://localhost:5000/khachhang');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].Email+'</td>'+'<td>'+data[i].TenKH+'</td>'+'<td>'+data[i].SDT+'</td>'+'<td>'+data[i].GioiTinh+'</td>'+'<td>'+data[i].DiaChi+'</td>'+'</tr>';
			if(i%2==1){
				$("#table-khachhang").append(
					'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
				
			}else{
				$("#table-khachhang").append(
					'<tr height="50px" class="trash">'+element);
				
			}
				
				
		}
	}
	
	
	
	async function getAllVeXe(){
		$('.trash').remove();
		$("#table-vexe").attr('height',20);
		const response=await fetch('http://localhost:5000/vexe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].MaVeXe+'</td>'+'<td>'+data[i].MaCX+'</td>'+'<td>'+data[i].SoGhe+'</td>'+'</tr>';
			if(i%2==1){
				$("#table-vexe").append(
					'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
				
			}else{
				$("#table-vexe").append(
					'<tr height="50px" class="trash">'+element);
				
			}
				
				
			}
	}
	async function getAllHoaDon(){
		$('.trash').remove();
		$("#table-hoadon").attr('height',20);
		const response=await fetch('http://localhost:5000/hoadon');
		const data= await response.json();
		console.log(data)
		for(var i=0;i < data.length;i++){
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].MaVeXe+'</td>'+'<td>'+data[i].Email+'</td>'+'<td>'+data[i].NgayDat+'</td>'+'</tr>';
			if(i%2==1){
				$("#table-hoadon").append(
					'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
				
			}else{
				$("#table-hoadon").append(
					'<tr height="50px" class="trash">'+element);
				
			}
				
				
		}
	}
	
	async function getDoanhThu(){
		$('.trash').remove();
		var ngaydat=$('#searchDate').val();
		var tongDoanhThu=0;
		const response=await fetch(`http://localhost:5000/hoadon/${ngaydat}`);
		const data= await response.json();
		for(var i=0;i<data.length;i++){
			tongDoanhThu+=Number(data[i].DonGia);
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].MaVeXe+'</td>'+'<td>'+data[i].MaCX+'</td>'+'<td>'+data[i].BienSoXe+'</td>'+'<td>'+data[i].SoGhe+'</td>'+'<td>'+data[i].TenKH+'</td>'+'<td>'+data[i].Email+'</td>'+'<td>'+data[i].DonGia+'</td>'+'</tr>';
			if(i%2==1){
				$("#table-doanhthu").append(
					'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
				
			}else{
				$("#table-doanhthu").append(
					'<tr height="50px" class="trash">'+element);
				
			}
		}
		$("#table-doanhthu").append('<tr height="50px" class="trash"><td align="right" colspan="7">Tổng Doanh Thu</td><td>'+tongDoanhThu+'</td></tr>');
	}
	
	getAllXe();
	
	getAllTuyenXe();
	
	getAllChuyenXe();
	
	getAllKhachHang();
	
	getAllVeXe();
	
	getAllHoaDon();

	
	
	
	//lay ra ben xe co thuoc tinh giong voi searchText
	
	async function getSearchXe(){
		$('.trash').remove();
		$("#table-xe").attr('height',20);
		var index=0;
		var text=$('#searchText').val();
		const response=await fetch('http://localhost:5000/xe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			if(data[i].BienSoXe.search(text)>-1||data[i].LoaiXe.search(text)>-1){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].BienSoXe+'</td>'+'<td>'+data[i].LoaiXe+'</td>'+'<td>'+String(data[i].SoLuongGhe)+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-xe").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}
				else{
					$("#table-xe").append(
						'<tr height="50px" class="trash">'+element);
					
				}
				index++;
			}	
		}
	}
	async function getSearchTuyenXe(){
		$('.trash').remove();
		$("#table-tuyenxe").attr('height',20);
		var index=0;
		var text=$('#searchText').val();
		const response= await fetch('http://localhost:5000/tuyenxe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			if(data[i].MaTX.search(text)>-1||data[i].DiemDi.search(text)>-1||data[i].DiemDen.search(text)>-1||String(data[i].DonGia)==text){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].MaTX+'</td>'+'<td>'+data[i].DiemDi+'</td>'+'<td>'+data[i].DiemDen+'</td>'+'<td>'+data[i].DonGia+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-tuyenxe").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}else{
					$("#table-tuyenxe").append(
						'<tr height="50px" class="trash">'+element);
					
				}
				index++;
			}		
		}
	}
	
	async function getSearchChuyenXe(){
		$('.trash').remove();
		$("#table-chuyenxe").attr('height',20);
		var index=0;
		var text=$('#searchText').val();
		const response= await fetch('http://localhost:5000/chuyenxe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			var date=new Date(data[i].NgayDi).toLocaleDateString();
			if(data[i].MaCX.search(text)>-1||data[i].MaTX.search(text)>-1||data[i].BienSoXe.search(text)>-1||date.search(text)>-1||String(data[i].GioDi).search(text)>-1){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].MaCX+'</td>'+'<td>'+data[i].MaTX+'</td>'+'<td>'+data[i].BienSoXe+'</td>'+'<td>'+date+'</td>'+'<td>'+data[i].GioDi+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-chuyenxe").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}else{
					$("#table-chuyenxe").append(
						'<tr height="50px" class="trash">'+element);
					
				}
				index++;
			}		
		}
	}
	
	async function getSearchKhachHang(){
		$('.trash').remove();
		$("#table-khachhang").attr('height',20);
		var index=0;
		var text=$('#searchText').val();
		const response= await fetch('http://localhost:5000/khachhang');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			if(data[i].Email.search(text)>-1||data[i].TenKH.search(text)>-1||data[i].SDT.search(text)>-1||data[i].GioiTinh.search(text)>-1||data[i].DiaChi.search(text)>-1){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].Email+'</td>'+'<td>'+data[i].TenKH+'</td>'+'<td>'+data[i].SDT+'</td>'+'<td>'+data[i].GioiTinh+'</td>'+'<td>'+data[i].DiaChi+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-khachhang").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}else{
					$("#table-khachhang").append(
						'<tr height="50px" class="trash">'+element);
					
				}
				index++;
			}
					
		}
	}
	
	async function getSearchVeXe(){
		$('.trash').remove();
		$("#table-vexe").attr('height',20);
		var index=0;
		var text=$('#searchText').val();
		const response=await fetch('http://localhost:5000/vexe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			if(data[i].MaVeXe.search(text)>-1||data[i].MaCX.search(text)>-1||data[i].SoGhe==Number(text)){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].MaVeXe+'</td>'+'<td>'+data[i].MaCX+'</td>'+'<td>'+data[i].SoGhe+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-vexe").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}else{
					$("#table-vexe").append(
						'<tr height="50px" class="trash">'+element);
					
				}
				index++;
			}
		}
	}
	
	async function getSearchHoaDon(){
		$('.trash').remove();
		$("#table-hoadon").attr('height',20);
		var index=0;
		var text=$('#searchText').val();
		const response=await fetch('http://localhost:5000/hoadon');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			if(data[i].MaVeXe.search(text)>-1||data[i].Email.search(text)>-1||String(data[i].NgayDat).search(text)>-1){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].MaVeXe+'</td>'+'<td>'+data[i].Email+'</td>'+'<td>'+data[i].NgayDat+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-hoadon").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}else{
					$("#table-hoadon").append(
						'<tr height="50px" class="trash">'+element);
					
				}
				index++;
			}
		}
			
	}
	async function getASearchUser(){
		$('.trash').remove();
		$("#table-user").attr('height',20);
		var index=0;
		var text=$('#searchText').val();
		const response=await fetch('http://localhost:5000/getallUsers');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			if(data[i].name.search(text)>-1||data[i].email.search(text)>-1||data[i].role.search(text)>-1){
				var element='<td>'+String((Number(index)+1))+'</td>'+'<td>'+data[i].name+'</td>'+'<td>'+data[i].email+'</td>'+'<td>'+data[i].role+'</td>'+'</tr>';
				if(index%2==1){
					$("#table-user").append(
						'<tr height="50px" class="trash" style="background-color: #E4E4E4;">'+element);
					
				}else{
					$("#table-user").append(
						'<tr height="50px" class="trash">'+element);
					
				}
				index++;
			}
			
				
				
		}
	}
	//click button tim kiem
	$('#buttonSearchDoanhThu').click(function(){
		getDoanhThu();
	});
	$("#buttonSearchBenXe").click(function(){	
		if($('#searchText').val()=="")getAllBenXe();
		else getSearchBenXe();
	});
	$("#buttonSearchXe").click(function(){	
		if($('#searchText').val()=="")getAllXe();
		else getSearchXe();
	});
	$("#buttonSearchTuyenXe").click(function(){	
		if($('#searchText').val()=="")getAllTuyenXe();
		else getSearchTuyenXe();
	});
	$("#buttonSearchChuyenXe").click(function(){	
		if($('#searchText').val()=="")getAllChuyenXe();
		else getSearchChuyenXe();
	});
	$("#buttonSearchKhachHang").click(function(){	
		if($('#searchText').val()=="")getAllKhachHang();
		else getSearchKhachHang();
	});
	$("#buttonSearchVeXe").click(function(){	
		if($('#searchText').val()=="")getAllVeXe();
		else getSearchVeXe();
	});
	$("#buttonSearchHoaDon").click(function(){	
		if($('#searchText').val()=="")getAllHoaDon();
		else getSearchHoaDon();
	});
	$("#buttonSearchUser").click(function(){	
		if($('#searchText').val()=="")getAllUser();
		else getASearchUser();
	});
	$(".buttonReload").click(function(){	
		$("#searchText").attr("value","");
		
		getAllBenXe();
	
		getAllXe();
	
		getAllTuyenXe();
	
		getAllChuyenXe();
	
		getAllKhachHang();
	
		getAllVeXe();
	
		getAllHoaDon();

	});
});