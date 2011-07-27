<?php
abstract class EyegraphsApplication extends EyeosApplicationExecutable {
	public static function __run(AppExecutionContext $context, MMapResponse $response) {
		//DEBUG
		$context->setIncludeBody(true);
		$response->appendToBody(file_get_contents('./extern/js/eyeos/ui/widgets/TextArea.js'));
	}
}
?>
