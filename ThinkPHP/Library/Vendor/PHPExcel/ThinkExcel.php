<?php
/**
 * Created by PhpStorm.
 * User: gadflybsd
 * Date: 2017/2/22
 * Time: 13:48
 */
Class ThinkExcel{
	private $objExcel, $objExcelSheet, $maxRow;

	/**
	 * ThinkExcel constructor.
	 *
	 * @param $param
	 * 	array(
	 *		'title'			=> '表格标题',
	 * 		'properties'	=> array('Creator' => '创建人', 'Modified' => '最后修改人', 'Title' => '标题', 'Subject' => '题目',
	 * 								 'Description' => '描述', 'Keywords' => '关键字', 'Category' => '种类', 'Sheet' => 'sheet的名称'),
	 * 		'caption'		=> array(array('title' => '标题1', 'width' => '宽度'), ...),
	 * 		'data'			=> array(数据)
	 * )
	 */
	public function __construct($param){
		require('PHPExcel.php');
		$this->objExcel = new PHPExcel();
		$param['title'] = isset($param['title'])?$param['title']:'业务数据导出表';
		array_unshift($param['caption'], array('title' => '序号', 'width' => 7));
		$this->maxRow = chr(64+count($param['caption']));
		$this->setSheet($param['properties']);
		$this->setTitle($param['title']);
		$this->setCaption($param['caption']);
		$this->setCell($param['data']);
	}

	/**
	 * @param string $file		输出文件名
	 * @param string $type		输出文件格式，可以是Excel5（默认）、Excel2007、HTML、PDF
	 */
	public function output($file='数据导出文件', $type='Excel5'){
		$objWriter = \PHPExcel_IOFactory::createWriter($this->objExcel, $type);
		header("Pragma: public");
		header("Expires: 0");
		header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
		header("Content-Type:application/force-download");
		header("Content-Type:application/vnd.ms-execl");
		header("Content-Type:application/octet-stream");
		header("Content-Type:application/download");;
		header('Content-Disposition:attachment;filename='.$file.'-'.time().'.xls');
		header("Content-Transfer-Encoding:binary");
		$objWriter->save('php://output');
	}

	private function setSheet($properties){
		$meta = array(
			'Creator'		=> isset($properties['Creator'])?$properties['Creator']:'GadflyBSD',
			'Modified'		=> isset($properties['Modified'])?$properties['Modified']:'GadflyBSD For PhpExcel',
			'Title'			=> isset($properties['Title'])?$properties['Title']:'Office 2005 XLS Title Document',
			'Subject'		=> isset($properties['Subject'])?$properties['Subject']:'Office 2005 XLS Subject Document',
			'Description'	=> isset($properties['Description'])?$properties['Description']:'Document for Office 2005 XLS.',
			'Keywords'		=> isset($properties['Keywords'])?$properties['Keywords']:'Office 2005 openxml php',
			'Category'		=> isset($properties['Category'])?$properties['Category']:'Office Document result file',
			'Sheet'			=> isset($properties['Sheet'])?$properties['Sheet']:'业务数据导出',
			'Index'			=> isset($properties['Index'])?$properties['Index']:0,
		);
		$this->objExcel->getProperties()->setCreator($meta['Creator']);				// 创建人
		$this->objExcel->getProperties()->setLastModifiedBy($meta['Modified']);		// 最后修改人
		$this->objExcel->getProperties()->setTitle($meta['Title']);					// 标题
		$this->objExcel->getProperties()->setSubject($meta['Subject']);				// 题目
		$this->objExcel->getProperties()->setDescription($meta['Description']);		// 描述
		$this->objExcel->getProperties()->setKeywords($meta['Keywords']);				// 关键字
		$this->objExcel->getProperties()->setCategory($meta['Category']);				// 种类
		$this->objExcelSheet = $this->objExcel->getActiveSheet();
		$this->objExcel->setActiveSheetIndex($meta['Index']);							// 设置当前的sheet
		$this->objExcel->getActiveSheet()->setTitle($meta['Sheet']);					// 设置sheet的name
}

	private function setTitle($title){
		$this->objExcelSheet->setCellValue('A1', $title);
		$this->objExcelSheet->mergeCells('A1:'.$this->maxRow.'1');
		$this->objExcelSheet->getStyle('A1')->getFont()->setSize(20);
		$this->objExcelSheet->getStyle('A1')->getFont()->setBold(true);
		$this->objExcelSheet->getStyle('A1')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
		$this->objExcelSheet->setCellValue('A2', '数据导出时间：'.date('Y-m-d H:i:s'));
		$this->objExcelSheet->mergeCells('A2:'.$this->maxRow.'2');
		$this->objExcelSheet->getStyle('A2')->getFont()->setSize(12);
		$this->objExcelSheet->getStyle('A2')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_RIGHT);
	}

	private function setCaption($caption){
		$i = 0;
		foreach($caption AS $val){
			$this->objExcelSheet->setCellValue(chr(65+$i).'3', $val['title']);
			$this->objExcelSheet->getColumnDimension(chr(65+$i))->setWidth($val['width']);
			$i++;
		}
		$this->objExcelSheet->getStyle('A3:'.chr(65+$i).'3')->getFont()->setSize(14);
		$this->objExcelSheet->getStyle('A3:'.chr(65+$i).'3')->getFont()->setBold(true);
		$this->objExcelSheet->getStyle('A3:'.chr(65+$i).'3')->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
	}

	private function setCell($data){
		$style = array(
			'borders' => array(
				'allborders' => array(
					'style' => \PHPExcel_Style_Border::BORDER_THIN,//细边框  
					'color' => array('argb' => 'FF993300'),
				),
			),
		);
		for($i=4; $i<(count($data)+4); $i++){
			$j = 1;
			$this->objExcelSheet->setCellValue(chr(65).$i, ($i-3));
			foreach($data[$i-4] AS $val){
				$this->objExcelSheet->setCellValue(chr(65+$j).$i, $val);
				$j++;
			}
		}
		$this->objExcelSheet->getStyle('A3:'.$this->maxRow.$i)->getFont()->setSize(12);
		$this->objExcelSheet->getStyle('A3:'.$this->maxRow.($i-1))->applyFromArray($style);
	}
}