package com.example.seb_main_project.exception;


//'각 컨트롤러에서 발생하는 예외'를 '이 클래스 GlobalExceptionAdvice'에서 공통으로 처리할 것임.
//따라서, '컨트롤러 내부에 구현된 @ExceptionHandler가 붙은 모든 메소드들을 제거해야 함'

import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice //'각 컨트롤러'마다 추가되는 '@ExceptionHandler 로직'에 대한 '중복 코드를 제거'하고, 컨트롤러의 코드 단순화 가능
public class GlobalExceptionAdvice {
}
