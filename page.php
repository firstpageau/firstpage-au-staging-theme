<?php
// Initialise Timber Data
$context = Timber::get_context();

// Get Post Details
$post = new Timber\Post();
$context['post'] = $post;

// Page Specific Extra Data
switch ($post->post_name) {
    case 'careers':
   
        // $context['sumome'] = true;
        break;
}

// Render Template
switch ($post->post_name) {
    case 'thank-you':
        $context['thankyou'] = true;
        $templates = array( pll_current_language() . '-' . 'page-contact.twig' );
        break;

    case 'thank-you-audit':
        $context['thankyou_audit'] = true;
        $templates = array( pll_current_language() . '-' . 'page-contact.twig' );
        break;

    case 'thank-you-competitor':
        $context['thankyou_competitor'] = true;
        $templates = array( pll_current_language() . '-' . 'page-contact.twig' );
        break;

    case 'thank-you-seo-audit':
        $context['thankyou_competitor'] = true;
        $templates = array( pll_current_language() . '-' . 'page-contact.twig' );
        break;

    default:
        $templates = array(
            pll_current_language() . '-' . 'page-' . $post->post_name . '.twig',
            pll_current_language() . '-' . 'page.twig'
        );
}
Timber::render( $templates, $context );