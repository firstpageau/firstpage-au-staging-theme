<?php
/**
 * Single view job meta box.
 *
 * Hooked into single_job_listing_start priority 20
 *
 * This template can be overridden by copying it to yourtheme/job_manager/content-single-job_listing-meta.php.
 *
 * @see         https://wpjobmanager.com/document/template-overrides/
 * @author      Automattic
 * @package     WP Job Manager
 * @category    Template
 * @since       1.14.0
 * @version     1.28.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $post;

do_action( 'single_job_listing_meta_before' ); ?>

<div class="job-listing-meta">
	<?php do_action( 'single_job_listing_meta_start' ); ?>

	<div class="row">
		<div class="col-12 col-md-8 mb-4">
			<div class="job-company"><?php echo get_the_company_name() . ' - ' . get_the_job_location(); ?></div>
			<div class="job-position"><?php wpjm_the_job_title(); ?></div>
		</div>
		<div class="d-none d-md-block col-12 col-md-4 mb-4 text-right">
			<a href="<?php echo function_exists('pll_home_url') ? pll_home_url() : get_site_url().'/'; ?>careers" class="back-btn">&lt; Back</a>
		</div>
	</div>

	<?php if ( is_position_filled() ) : ?>
		<div class="position-filled"><?php _e( 'This position has been filled', 'wp-job-manager' ); ?></div>
	<?php elseif ( ! candidates_can_apply() && 'preview' !== $post->post_status ) : ?>
		<div class="listing-expired"><?php _e( 'Applications have closed', 'wp-job-manager' ); ?></div>
	<?php endif; ?>

	<?php do_action( 'single_job_listing_meta_end' ); ?>
</div>

<?php do_action( 'single_job_listing_meta_after' ); ?>
