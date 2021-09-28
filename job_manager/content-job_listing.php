<?php
/**
 * Job listing in the loop.
 *
 * This template can be overridden by copying it to yourtheme/job_manager/content-job_listing.php.
 *
 * @see         https://wpjobmanager.com/document/template-overrides/
 * @author      Automattic
 * @package     WP Job Manager
 * @category    Template
 * @since       1.0.0
 * @version     1.27.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $post;
?>
<div class="col-12 col-md-6">
    <div class="vacancy-box">
        <div class="vacancy-details">
            <h5><a href="<?php the_job_permalink(); ?>"><?php wpjm_the_job_title(); ?></a></h5>
            <p><?php echo get_field('short_desc'); ?></p>
        </div>
        <div class="more-links single_job_listing">
            <a class="" href="<?php the_job_permalink(); ?>#details">Read More</a>
            <?php if ( candidates_can_apply() ) : ?>
            <?php get_job_manager_template( 'job-application.php' ); ?>
            <?php endif; ?>
        </div>
    </div>
</div>