$(document).ready(function(){

	var dsMaBX=[];
	var dsBienSoXe=[];
	var dsBienSoXe_cx=[];
	var dsNgayDi=[];
	var dsGioDi=[];
	var dsMaTX=[];
	var dsMaCX=[];
	var dsEmail=[];
	
	//nhan data tu csdl
	async function getAllXe(){
		const response=await fetch('http://localhost:5000/xe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			dsBienSoXe.push(data[i].BienSoXe);
			$("#BienSoXe-ChuyenXe").append(`<option>${data[i].BienSoXe}</option>`);
			var element='<td >'+String((Number(i)+1))+'</td>'+'<td>'+data[i].BienSoXe+'</td>'+'<td>'+data[i].LoaiXe+'</td>'+'<td>'+String(data[i].SoLuongGhe)+'</td>'+'</tr>';
			$("#table-xe").append('<tr class="onRow" height="50px">'+element);
				
		}
		$('#table-xe tr').click(function () {
			var bienSoXe = $(this).closest('.onRow').find('td:nth-child(2)').text();
			var loaiXe=$(this).closest('.onRow').find('td:nth-child(3)').text();
			var soLuongGhe=$(this).closest('.onRow').find('td:nth-child(4)').text();
			$('#BienSoXe').val(bienSoXe);
			$('#LoaiXe').val(loaiXe);
			$('#SoLuongGhe').val(soLuongGhe);
		});
	}
	
	async function getAllTuyenXe(){
		const response= await fetch('http://localhost:5000/tuyenxe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			dsMaTX.push(data[i].MaTX);
			$("#MaTX-ChuyenXe").append(`<option>${data[i].MaTX}</option>`);
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].MaTX+'</td>'+'<td>'+data[i].DiemDi+'</td>'+'<td>'+data[i].DiemDen+'</td>'+'<td>'+data[i].DonGia+'</td>'+'</tr>';
			$("#table-tuyenxe").append('<tr class="onRow" height="50px">'+element);	
		}
		$('#table-tuyenxe tr').click(function () {
			var maTX = $(this).closest('.onRow').find('td:nth-child(2)').text();
			var diemDi=$(this).closest('.onRow').find('td:nth-child(3)').text();
			var diemDen=$(this).closest('.onRow').find('td:nth-child(4)').text();
			var donGia=$(this).closest('.onRow').find('td:nth-child(5)').text();
			$('#MaTX').val(maTX);
			$('#DiemDi').val(diemDi);
			$('#DiemDen').val(diemDen);
			$('#DonGia').val(donGia);
		});
	}
	
	async function getAllChuyenXe(){
		const response= await fetch('http://localhost:5000/chuyenxe');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			var date=new Date(data[i].NgayDi).toLocaleDateString();
			dsMaCX.push(data[i].MaCX);
			dsBienSoXe_cx.push(data[i].BienSoXe);
			dsNgayDi.push(date);
			dsGioDi.push(data[i].GioDi);
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].MaCX+'</td>'+'<td>'+data[i].MaTX+'</td>'+'<td>'+data[i].BienSoXe+'</td>'+'<td>'+date+'</td>'+'<td>'+data[i].GioDi+'</td>'+'</tr>';
			$("#table-chuyenxe").append('<tr class="onRow" height="50px">'+element);
		}
		$('#table-chuyenxe tr').click(function () {
			var maCX = $(this).closest('.onRow').find('td:nth-child(2)').text();
			var maTX=$(this).closest('.onRow').find('td:nth-child(3)').text();
			var bienSoXe=$(this).closest('.onRow').find('td:nth-child(4)').text();
			var ngayDi=$(this).closest('.onRow').find('td:nth-child(5)').text();
			var gioDi=$(this).closest('.onRow').find('td:nth-child(6)').text();
			$('#MaCX').val(maCX);
			$('#MaTX-ChuyenXe').val(maTX);
			$('#BienSoXe-ChuyenXe').val(bienSoXe);
			$('#NgayDi').val(ngayDi);
			$('#GioDi').val(gioDi);
		});
	}
	
	async function getAllKhachHang(){
		const response= await fetch('http://localhost:5000/khachhang');
		const data= await response.json();
		for(var i=0;i < data.length;i++){
			dsEmail.push(data[i].Email);
			$('#Email-KhachHang').append(`<option>${data[i].Email}</option>`);
			var element='<td>'+String((Number(i)+1))+'</td>'+'<td>'+data[i].Email+'</td>'+'<td>'+data[i].TenKH+'</td>'+'<td>'+data[i].SDT+'</td>'+'<td>'+data[i].GioiTinh+'</td>'+'<td>'+data[i].DiaChi+'</td>'+'</tr>';
			$("#table-khachhang").append('<tr class="onRow" height="50px">'+element);	
		}
		$('#table-khachhang tr').click(function () {
			var email = $(this).closest('.onRow').find('td:nth-child(2)').text();
			var tenKH=$(this).closest('.onRow').find('td:nth-child(3)').text();
			var SDT=$(this).closest('.onRow').find('td:nth-child(4)').text();
			var gioiTinh=$(this).closest('.onRow').find('td:nth-child(5)').text();
			var diaChi=$(this).closest('.onRow').find('td:nth-child(6)').text();
			$('#Email-KhachHang').val(email);
			$('#TenKH').val(tenKH);
			$('#SDT').val(SDT);
			$('#GioiTinh').val(gioiTinh);
			$('#DiaChi').val(diaChi);
		});
	}
	
	getAllXe();
	
	getAllTuyenXe();
	
	getAllChuyenXe();
	
	getAllKhachHang();
	
	
	
	//Check dieu kien
	
	
	function checkBienSoXe(){
		for(var i=0;i<dsBienSoXe.length;i++){
			if($('#BienSoXe').val()==dsBienSoXe[i])return false;
		}
		return true;
	}
	function checkMaTX(){
		for(var i=0;i<dsMaTX.length;i++){
			if($('#MaTX').val()==dsMaTX[i])return false;
		}
		return true;
	}
	function checkMaCX(){
		for(var i=0;i<dsMaCX.length;i++){
			if($('#MaCX').val()==dsMaCX[i])return false;
		}
		return true;
	}
	function checkChuyenXe(){
		var d=new Date($('#NgayDi').val()).toLocaleDateString();
		for(var i=0;i<dsMaCX.length;i++){
			if($('#BienSoXe-ChuyenXe').val()==dsBienSoXe_cx[i]&&d==dsNgayDi[i]&&String($('#GioDi').val())==dsGioDi[i])return false;
		}
		return true;
	}
	
	
	
	//them xoa sua ben xe
	
	
	
	
	//them xoa sua xe
	$('#buttonInsertXe').click(function(){
		var regBienSoXe="[0-9]{2}[A-Z]+[0-9]{5}"
		if($('#BienSoXe').val()==''){
			$('#warning').append("BienSoXe không được bỏ trống");
		}
		else if(!$('#BienSoXe').val().match(regBienSoXe)){
			$('#warning').append("BienSoXe không đúng");
		}
		else{
			if(checkBienSoXe()==false) $('#warning').append('BienSoXe không được trùng !!');
			else{
				fetch('http://localhost:5000/xe',{
					method: 'POST',
        			headers:{
            			'Content-Type' :'application/json'
        			},
        			body: JSON.stringify({
          				'BienSoXe':$('#BienSoXe').val(),
		  				'LoaiXe':$('#LoaiXe').val(),
		  				'SoLuongGhe':$('#SoLuongGhe').val()
        			})
				})
			
				alert(`Xe ${$('#BienSoXe').val()} Added `);
				
			}
			
		}
		
		
	});
	$('#buttonUpdateXe').click(function(){
		if($('#BienSoXe').val()==''){
			$('#warning').append("BienSoXe không được bỏ trống");
		}
		else{
			if(checkBienSoXe()==true) $('#warning').append('BienSoXe không tồn tại !!');
			else{
				fetch(`http://localhost:5000/xe/${$('#BienSoXe').val()}`,{
					method: 'PUT',
        			headers:{
            			'Content-Type' :'application/json'
        			},
        			body: JSON.stringify({
          				'BienSoXe':$('#BienSoXe').val(),
		  				'LoaiXe':$('#LoaiXe').val(),
		  				'SoLuongGhe':$('#SoLuongGhe').val()
        			})
				})
			
				alert(`Xe ${$('#BienSoXe').val()} Updated `);
				
			}
		}
		
	});
	$('#buttonDeleteXe').click(function(){
		if($('#BienSoXe').val()==''){
			$('#warning').append("BienSoXe không được bỏ trống");
		}
		else{
			if(checkBienSoXe()==true) $('#warning').append('BienSoXe không tồn tại !!');
			else{
				fetch(`http://localhost:5000/xe/${$('#BienSoXe').val()}`,{
					method: 'DELETE',
        			headers:{
            			'Content-Type' :'application/json'
        			}
				})
			
				alert(`Xe ${$('#BienSoXe').val()} Deleted `);
				
			}
			
		}
		
	});
	
	
	//them xoa sua tuyen xe
	$('#buttonInsertTuyenXe').click(function(){
		if($('#MaTX').val()==''){
			$('#warningMaTX').append("MaTX không được bỏ trống");
		}
		else if($('#DiemDi').val()==$('#DiemDen').val()){
				$('#warningDiemDen').append("DiemDen và DiemDi không được trùng nhau");
			}
		else{
			
			if(checkMaTX()==false) $('#warningMaTX').append('MaTX không được trùng');
			else{
				fetch('http://localhost:5000/tuyenxe',{
					method: 'POST',
        			headers:{
            			'Content-Type' :'application/json'
        			},
        			body: JSON.stringify({
          				'MaTX':$('#MaTX').val(),
		  				'DiemDi':$('#DiemDi').val(),
						'DiemDen':$('#DiemDen').val(),
						'DonGia':$('#DonGia').val()
        			})
				})
			
				alert(`Tuyen Xe ${$('#MaTX').val()} Added `);
				location.reload();
			}
			
		}
		
		
	});
	$('#buttonUpdateTuyenXe').click(function(){
		if($('#MaTX').val()==''){
			$('#warningMaTX').append("MaTX không được bỏ trống");
		}
		else if($('#DiemDi').val()==$('#DiemDen').val()){
				$('#warningDiemDen').append("DiemDen và DiemDi không được trùng nhau");
			}
		else{
			
			if(checkMaTX()==true)$('#warningMaTX').append('MaTX không tồn tại');
			else{
				fetch(`http://localhost:5000/tuyenxe/${$('#MaTX').val()}`,{
					method: 'PUT',
        			headers:{
            			'Content-Type' :'application/json'
        			},
					body: JSON.stringify({
          				'MaTX':$('#MaTX').val(),
		  				'DiemDi':$('#DiemDi').val(),
						'DiemDen':$('#DiemDen').val(),
						'DonGia':$('#DonGia').val()
        			})
				})
			
				alert(`Tuyen Xe ${$('#MaTX').val()} Updated `);
				location.reload();
			}
			
		}
		
	});
	$('#buttonDeleteTuyenXe').click(function(){
		if($('#MaTX').val()==''){
			$('#warningMaTX').append("MaTX không được bỏ trống");
		}
		else{
			if(checkMaTX()==true)$('#warningMaTX').append('MaTX không tồn tại');
			else{
				fetch(`http://localhost:5000/tuyenxe/${$('#MaTX').val()}`,{
					method: 'DELETE',
        			headers:{
            			'Content-Type' :'application/json'
        			}
				})
			
				alert(`Tuyen Xe ${$('#MaTX').val()} Deleted `);
				location.reload();
			}
			
		}
		
	});
	
	//them xoa sua chuyen xe
	$('#buttonInsertChuyenXe').click(function(){
		if($('#MaCX').val()==''){
			$('#warningMaCX').append("MaTX không được bỏ trống");
		}
		else if($('#GioDi').val()==''){
			$('#warningGioDi').append("GioDi không được bỏ trống");
		}
		else if($('#NgayDi').val()==''){
			$('#warningNgayDi').append("NgayDi không được bỏ trống");
		}
		else if(checkChuyenXe()==false){
			alert("BienSoXe, NgayDi, GioDi đã tồn tại !!!");
		}
		else{
			if(checkMaCX()==false) $('#warningMaCX').append('MaCX không được trùng');
			else{
				fetch('http://localhost:5000/chuyenxe',{
					method: 'POST',
        			headers:{
            			'Content-Type' :'application/json'
        			},
        			body: JSON.stringify({
          				'MaCX':$('#MaCX').val(),
						'MaTX':$('#MaTX-ChuyenXe').val(),
						'BienSoXe':$('#BienSoXe-ChuyenXe').val(),
						'NgayDi':$('#NgayDi').val(),
						'GioDi':$('#GioDi').val()
						
        			})
				})
			
				alert(`Chuyen Xe ${$('#MaCX').val()} Added `);
				location.reload();
			}
			
		}
		
		
	});
	$('#buttonUpdateChuyenXe').click(function(){
		if($('#MaCX').val()==''){
			$('#warningMaCX').append("MaTX không được bỏ trống");
		}
		else if($('#GioDi').val()==''){
			$('#warningGioDi').append("GioDi không được bỏ trống");
		}
		else if($('#NgayDi').val()==''){
			$('#warningNgayDi').append("NgayDi không được bỏ trống");
		}
		else{
			if(checkMaCX()==true) $('#warningMaCX').append('MaCX không tồn tại');
			else{
				fetch(`http://localhost:5000/chuyenxe/${$('#MaCX').val()}`,{
					method: 'PUT',
        			headers:{
            			'Content-Type' :'application/json'
        			},
					body: JSON.stringify({
          				'MaCX':$('#MaCX').val(),
						'MaTX':$('#MaTX-ChuyenXe').val(),
						'BienSoXe':$('#BienSoXe-ChuyenXe').val(),
						'NgayDi':$('#NgayDi').val(),
						'GioDi':$('#GioDi').val()
        			})
				})
			
				alert(`Chuyen Xe ${$('#MaCX').val()} Updated `);
				location.reload();
			}
			
		}
		
	});
	$('#buttonDeleteChuyenXe').click(function(){
		if($('#MaCX').val()==''){
			$('#warningMaCX').append('MaCX Không được bỏ trống');
		}
		else{
			if(checkMaCX()==true) $('#warningMaCX').append('MaCX không tồn tại');
			else{
				fetch(`http://localhost:5000/chuyenxe/${$('#MaCX').val()}`,{
					method: 'DELETE',
        			headers:{
            			'Content-Type' :'application/json'
        			}
				})
			
				alert(`Cuyen Xe ${$('#MaCX').val()} Deleted `);
				location.reload();
			}
			
		}
		
	});
	//sua thong tin khach hang
	$('#buttonUpdateKhachHang').click(function(){
		var regSDT="^0+[0-9]{9}";
		if($('#TenKH').val()==''){
			$('#warningTenKH').append('TenKH Không được bỏ trống');
		}
		else if($('#SDT').val()==''){
			$('#warningSDT').append('SDT Không được bỏ trống');
		}
		else if($('#DiaChi').val()==''){
			$('#warningDiaChi').append('DiaChi Không được bỏ trống');
		}
		else if(!$('#SDT').val().match(regSDT)){
			$('#warningSDT').append('Nhập Sai Số Điện Thoại ');
		}
		else{
			fetch(`http://localhost:5000/khachhang/${$('#Email-KhachHang').val()}`,{
				method: 'PUT',
        		headers:{
            		'Content-Type' :'application/json'
        		},
				body: JSON.stringify({
          			'Email': $('#Email-KhachHang').val(),
					'TenKH': $('#TenKH').val(),
					'SDT': $('#SDT').val(),
					'GioiTinh': $('#GioiTinh').val(),
					'DiaChi': $('#DiaChi').val()
        		})
			})
			alert(`Khach Hang ${$('#Email-KhachHang').val()} Updated `);
		}
	});
	
	
	
});