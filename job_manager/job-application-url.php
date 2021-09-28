<?php
/**
 * Apply using link to website.
 *
 * This template can be overridden by copying it to yourtheme/job_manager/job-application-url.php.
 *
 * @see         https://wpjobmanager.com/document/template-overrides/
 * @author      Automattic
 * @package     wp-job-manager
 * @category    Template
 * @version     1.32.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>
<?php esc_html_e( '', 'wp-job-manager' ); ?> <a class="application_button button" href="<?php echo esc_url( $apply->url ); ?>" target="_blank" rel="nofollow">Apply Now</a>
